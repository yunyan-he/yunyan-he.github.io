# **使用 Play Install Referrer 库在 Android 上追踪应用安装来源**

## **基本介绍**

在推广应用时，通常会通过各种渠道引导用户跳转到 Google Play 进行下载。为了分析这些推广渠道的实际转化效果，我们可以从 Google Play 检索引流来源信息（Referrer），并将该数据传递到应用中进行分析。

## **Play Install Referrer 库的常见用途**

* **多渠道广告活动分析：** 当在多个不同渠道投放应用广告时，可以使用 Play Install Referrer 库来分析是哪个广告渠道带来了下载量。  
* **安装来源追踪：** 开发者可以记录应用的下载来源，从而优化营销策略和广告预算配置。  
* **广告效果评估：** 了解每个渠道的实际安装来源，能够科学评估不同推广活动的投入产出比（ROI）。

## **核心功能**

* **安全地检索 Referrer 信息：** Play Install Referrer 库允许应用安全地从 Google Play 商店获取应用的安装来源数据。  
* **传递来源数据：** 获取到的来源信息会被传递到应用内部，用于后续的数据处理与统计分析。

## **如何使用**

### **1. 添加依赖**

你需要在项目 app 模块的 `build.gradle` 文件的 `dependencies` 块中添加该库的依赖：

```gradle
dependencies {  
    implementation("com.android.installreferrer:installreferrer:2.2")  
}
```

### **2. 连接到 Google Play**

由于需要从 Google Play 商店获取信息，因此首先必须与 Google Play 建立连接。

调用 `newBuilder()` 方法来创建 `InstallReferrerClient` 类的实例。该类负责与 Google Play 服务进行通信，并获取应用的安装来源信息。

```kotlin
val referrerClient = InstallReferrerClient.newBuilder(context).build()
```

调用 `startConnection()` 与 Google Play 建立连接。该方法是异步的，连接成功或失败时会触发相应的回调。因此，你必须实现 `InstallReferrerStateListener` 接口来处理连接完成后的回调事件。

```kotlin
referrerClient.startConnection(object : InstallReferrerStateListener {  
    override fun onInstallReferrerSetupFinished(responseCode: Int) {  
        // 处理连接结果  
    }
 
    override fun onInstallReferrerServiceDisconnected() {  
        // 处理连接断开  
    }  
})
```

### **3. 实现接口方法**

实现 `onInstallReferrerSetupFinished()` 方法。该方法在连接流程结束后被调用。你需要检查 `responseCode` 来确定连接状态：`OK` 表示连接成功；其他 `InstallReferrerResponse` 常量则代表不同类型的错误。

```kotlin
override fun onInstallReferrerSetupFinished(responseCode: Int) {  
    when (responseCode) {  
        InstallReferrerResponse.OK -> {  
            // 连接成功，可以获取安装来源信息  
        }  
        InstallReferrerResponse.FEATURE_NOT_SUPPORTED -> {  
            // 当前设备的 Play 商店应用不支持该 API  
        }  
        InstallReferrerResponse.SERVICE_UNAVAILABLE -> {  
            // 无法建立连接，可能是网络问题  
        }  
    }  
}
```

实现 `onInstallReferrerServiceDisconnected()` 方法来处理与 Google Play 的意外断开连接。例如，若 Play 商店服务在后台更新，连接可能会中断。连接断开时，你需要再次调用 `startConnection()` 重新建立连接，以确保能继续发送请求。

```kotlin
override fun onInstallReferrerServiceDisconnected() {  
    // 连接断开时重启连接  
    referrerClient.startConnection(this)  
}
```

### **4. 获取安装引流来源 (Install Referrer)**

在 `onInstallReferrerSetupFinished` 方法中，若连接成功（`responseCode` 为 `InstallReferrerResponse.OK`），则在此逻辑块内获取安装来源详情。

```kotlin
val response: ReferrerDetails = referrerClient.installReferrer  
val referrerUrl: String = response.installReferrer  
val referrerClickTime: Long = response.referrerClickTimestampSeconds  
val appInstallTime: Long = response.installBeginTimestampSeconds  
val instantExperienceLaunched: Boolean = response.googlePlayInstantParam
```

* `ReferrerDetails` 对象包含关于应用安装引流来源的详细信息。  
* `referrerUrl` 通常包含用户下载应用的具体页面参数（如广告系列参数等）。  
* `referrerClickTimestampSeconds` 属性返回一个 `Long` 值，表示用户点击广告链接的时间戳（单位：秒）。  
* `installBeginTimestampSeconds` 属性返回一个 `Long` 值，表示应用开始安装的时间戳（单位：秒）。  
* `googlePlayInstantParam` 属性返回一个布尔值，指示应用是否是通过即时体验（Instant App）启动的。

在 Android 开发者文档中，`ReferrerDetails` 提供了许多获取相关变量的方法。

### **5. 断开连接**

检索完 referrer 信息后，建议在 `InstallReferrerClient` 实例上调用 `endConnection()` 方法断开连接。这有助于防止内存泄漏并提升应用性能。

## **使用示例**

添加依赖后，创建一个 `InstallReferrerUtils` 单例对象来统一处理 Android 应用中的 Google Play 安装来源信息。

任何需要使用该类的文件均可将其导入，然后调用其初始化函数。之后便可使用 `getReferrerInfo()` 获取相应数据以执行存储或分析操作。

```kotlin
// 在 MainActivity 的 onCreate 方法中使用 InstallReferrerUtils
 
// 初始化 InstallReferrerUtils  
InstallReferrerUtils.INSTANCE.init(this);  
// 触发自定义代码以展示 referrer 信息  
displayReferrerInfo();
```

```kotlin
// InstallReferrerUtils 类完整代码  
package cider.lib.utils
 
import android.content.Context  
import android.os.Handler  
import android.os.HandlerThread  
import android.util.Log  
import com.android.installreferrer.api.InstallReferrerClient  
import com.android.installreferrer.api.InstallReferrerStateListener  
import com.android.installreferrer.api.InstallReferrerClient.InstallReferrerResponse  
import com.android.installreferrer.api.ReferrerDetails
 
object InstallReferrerUtils {
 
    private var referrerClient: InstallReferrerClient? = null  
    private var referrerInfo: String = "No referrer information available."
 
    private val installReferrerStateListener = object : InstallReferrerStateListener {  
        override fun onInstallReferrerSetupFinished(responseCode: Int) {  
            if (responseCode == InstallReferrerResponse.OK) {  
                handleInstallReferrerParams()  
                release()  
            } else {  
                Log.e("InstallReferrer", "Connection failed, error code: $responseCode")  
            }  
        }
 
        override fun onInstallReferrerServiceDisconnected() {  
            reconnectHandler?.postDelayed(reconnectRunnable, 10000)  
        }  
    }
 
    private var reconnectHandler: Handler? = null  
    private var reconnectHandlerThread: HandlerThread? = null  
    private var reconnectRunnable = Runnable { connectReferrerClient() }  
      
    init {  
        reconnectHandlerThread = HandlerThread("InstallReferrerReconnectThread").apply {  
            start()  
            reconnectHandler = Handler(looper)  
        }  
    }
 
    fun init(context: Context) {  
        if (referrerClient == null) {  
            referrerClient = InstallReferrerClient.newBuilder(context).build()  
        }  
        connectReferrerClient()  
    }
 
    private fun connectReferrerClient() {  
        referrerClient?.run {  
            if (!isReady) {  
                startConnection(installReferrerStateListener)  
            }  
        }  
    }
 
    private fun handleInstallReferrerParams() {  
        referrerClient?.run {  
            if (isReady) {  
                val response: ReferrerDetails = this.installReferrer  
                val installReferrer = response.installReferrer  
                val installVersion = response.installVersion  
                val installBeginTimestampSeconds = response.installBeginTimestampSeconds  
                val installBeginTimestampServerSeconds = response.installBeginTimestampServerSeconds  
                val referrerClickTimestampSeconds = response.referrerClickTimestampSeconds  
                val referrerClickTimestampServerSeconds = response.referrerClickTimestampServerSeconds  
                val googlePlayInstantParam = response.googlePlayInstantParam  
                  
                referrerInfo = "Install Referrer: $installReferrer\n" +  
                        "Install Version: $installVersion\n" +  
                        "Install Begin Time: $installBeginTimestampSeconds\n" +  
                        "Referrer Click Time: $referrerClickTimestampSeconds\n" +  
                        "Instant Experience Launched: $googlePlayInstantParam"  
            }  
        }  
    }
 
    fun getReferrerInfo(): String {  
        return referrerInfo  
    }
 
    private fun release() {  
        referrerClient?.endConnection()  
        reconnectHandler?.removeCallbacksAndMessages(null)  
        reconnectHandlerThread?.quit()  
        reconnectHandlerThread = null  
        reconnectHandler = null  
        referrerClient = null  
    }  
}
```

## **测试结果**

若在本地（例如模拟器）运行此代码，你将会看到一条信息，显示安装来源为本地安装。

<div class="mb-8">
  <img src="blogs/images/android-play-install-referrer-tutorial-image0.png" alt="Install referrer link preview" class="w-[60%] mx-auto rounded-md shadow" />
  <p class="text-center text-sm text-gray-600 mt-2"><em>安装来源链接预览示例</em></p>
</div>

在开发者后台设置封闭测试后，你将获得一个下载链接：  
`https://play.google.com/store/apps/details?id=com.cider`  
通过拼接 `utm_source`, `utm_medium`, `utm_campaign` 等参数来模拟引流参数，可以获得如下下载链接：  
`https://play.google.com/store/apps/details?id=com.cider&referrer=utm_source%3Dsource_example%26utm_medium%3Dmedium_example%26utm_campaign%3Dcampaign_example`  
点击该链接会跳转到 Google Play 下载页面。下载并首次打开应用后，结果如下所示。可以看到，应用已成功从下载链接中检索到了引流的渠道参数：

<div class="mb-8">
  <img src="blogs/images/android-play-install-referrer-tutorial-image1.png" alt="App referrer result" class="w-[60%] mx-auto rounded-md shadow" />
  <p class="text-center text-sm text-gray-600 mt-2"><em>应用成功检索到来源引流参数</em></p>
</div>
