# **Android端集成 Gemini Vision**

## **1\. 概述**

本文档概述了将 Google Gemini Vision API（具体为 `gemini-2.5-flash-preview-09-2025` 模型）集成到 Android 应用中的架构设计与数据流。此集成替代了用于远程动物识别的旧款（百度）API，从而提供了一种完全基于英文、现代且高效的远程推理能力。

该系统被设计为提供第二重的云端识别结果，用以辅助并补充手机本地首选的 ONNX 模型识别结果。

## **2\. 前提条件**

在此工作流正常运转前，必须满足以下条件：

1. **API 密钥：** 必须获取有效的 Google AI Studio API 密钥，并安全地存储在 `local.properties` 的 `GEMINI_API_KEY` 变量中。  
2. **Gradle 依赖：** 在 `app/build.gradle` 中需引入以下依赖：  
   * `com.squareup.retrofit2:retrofit`  
   * `com.squareup.retrofit2:converter-gson`  
   * `com.squareup.okhttp3:okhttp`  
   * `com.squareup.okhttp3:logging-interceptor` (用于网络请求调试)

## **3\. 核心组件**

应用与 Gemini API 的连接由四个专属的 Kotlin 文件管理，遵循经典的 Retrofit 设计模式。

### **3.1. GeminiService.kt (接口类)**

该接口定义了 API 的 HTTP 请求终端。

* **`@POST("v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent")`**：这是最关键的部分。我们通过将其直接硬编码在 URL 中，明确指定调用免费层级的 **`gemini-2.5-flash-preview-09-2025` 模型**。这可以防止意外调用其他收费模型。  
* **`generateContent(...)`**：挂起函数（suspend function），用于将 `GeminiRequest` 对象作为请求体（`@Body`），以及将 API 密钥作为查询参数（`@Query`）进行网络发送。

### **3.2. GeminiRequest.kt (请求载荷)**

这组数据类用于构建发送至 Gemini API 的符合多模态输入（文本 + 图片）规范的 JSON 结构。

* 数据的结构层级为：`GeminiRequest` -> `Content` -> `List<Part>`。  
* 其中 `List<Part>` 必须包含两个对象：  
  1. 一个包含 `text` 字段的 `Part`（即提示词/Prompt）。  
  2. 一个包含 `inlineData` 字段的 `Part`（即 Base64 编码的图片数据）。

### **3.3. GeminiResponse.kt (响应结果)**

这组数据类用于解析来自 API 返回的 JSON 响应。

* 数据的结构层级为：`GeminiResponse` -> `List<Candidate>` -> `Content` -> `List<Part>`。  
* 应用的业务逻辑会自动解析该结构，以提取出 `candidates[0].content.parts[0].text` 的内容，它包含了识别出来的动物名称。

### **3.4. GeminiApiClient.kt (客户端类)**

这是一个 Retrofit 单例对象，用于装配和初始化上述组件。

* 它将 `BASE_URL` 设置为 `https://generativelanguage.googleapis.com/`。  
* 它为 `OkHttpClient` 配置了 `HttpLoggingInterceptor` 以便在调试模式下拦截并打印网络通信日志。  
* 它使用延迟加载（lazy-initialization）实例化了 `GeminiService` 接口（`api`），供应用的其它部分进行调用。

## **4\. 执行流程 (步骤详解)**

整个多模态识别流程由 `ResultActivity.kt` 里的 `fetchGeminiResult()` 函数统一进行编排。

1. **触发：** 用户点击 UI 上的 `btnGeminiApi`（“查看 Gemini 识别结果”）按钮。  
2. **状态检查：** 应用检查是否已经拉取过远程结果。若无，则调用 `fetchGeminiResult()`。  
3. **展示加载动画：** 将 `loadingLayout` 的可见性设为 `VISIBLE`。  
4. **加载图片：** 从传递给 `Intent` 的 `Uri` 中加载对应的 `Bitmap` 对象。  
5. **图片编码：** 调用 `encodeImageToBase64(bitmap)`。该函数将 `Bitmap` 压缩为 JPEG 格式，并编码为 Base64 字符串。  
6. **定义提示词：** 加载 `GEMINI_PROMPT` 常量：  
   `Identify the animal in this image. Respond with only the common name of the animal...`  
7. **构建请求体：** 组装 `GeminiRequest` 对象，将 `GEMINI_PROMPT`（作为 `text`）和 `base64Image`（作为 `inlineData`）封装进 `parts` 列表中。  
8. **发起网络请求：** 协程切换至 `Dispatchers.IO`。调用 `GeminiApiClient.api.generateContent(...)`，传入请求载荷和 `geminiApiKey`。  
9. **解析响应：** 等待 `GeminiResponse` 返回。解析逻辑将安全地导航并提取 `text` 字段中的动物名称字符串（例如，返回 `"Lion"`）。  
10. **API 链式调用：** 这是一个核心的设计决策。应用并不直接信任并使用 Gemini 返回的信息描述，而是采用 **API 链式衔接**。它获取到 `"Lion"` 这个字符串后，立即调用 `fetchWikiIntro("Lion")`，这会利用另一个独立的 `WikiIntroClient` 从维基百科检索出高质量的百科简介。  
11. **更新全局状态：** 使用拉取到的全新远程数据更新 `RecognitionState`：  
    * `remoteAnimalType` = `"Lion"` (来自 Gemini)  
    * `remoteAnimalIntro` = `"The lion (Panthera leo)..."` (来自维基百科)  
    * `remoteDetailUrl` = `"https://en.wikipedia.org/wiki/Lion"`  
12. **更新 UI 界面：** 调用 `showResult()`，隐藏加载指示器，并将 `remoteAnimalType` 和 `remoteAnimalIntro` 显示在屏幕上。

这一架构成功地将动物识别（Gemini）与背景信息获取（维基百科）解耦开来，使得整个系统非常模块化、易于维护。
