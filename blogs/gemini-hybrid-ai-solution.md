# **Android integration of Gemini Vision**

## **1\. Overview**

This document outlines the architecture and data flow for integrating the Google Gemini Vision API (gemini-2.5-flash-preview-09-2025) into the Android application. This integration replaces a legacy (Baidu) API for remote animal recognition, providing a fully English-based, modern, and robust remote inference capability.

The system is designed to provide a secondary, cloud-based recognition result that complements the primary on-device (ONNX) recognition.

## **2\. Prerequisites**

Before this flow can function, the following are required:

1. **API Key:** A valid Google AI Studio API Key must be obtained and stored securely in local.properties as GEMINI\_API\_KEY.  
2. **Gradle Dependencies:** The following must be present in app/build.gradle:  
   * com.squareup.retrofit2:retrofit  
   * com.squareup.retrofit2:converter-gson  
   * com.squareup.okhttp3:okhttp  
   * com.squareup.okhttp3:logging-interceptor (for debugging)

## **3\. Core Components (The "Toolkit")**

The connection to the Gemini API is managed by four dedicated Kotlin files, following the Retrofit pattern.

### **3.1. GeminiService.kt (The Interface)**

This interface defines the API endpoint.

* **@POST("v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent")**: This is the most critical part. We explicitly target the **free-tier gemini-2.5-flash-preview-09-2025 model** by hardcoding it into the URL. This prevents accidental calls to paid models.  
* **generateContent(...)**: The suspend function that sends the GeminiRequest as its @Body and the API key as a @Query parameter.

### **3.2. GeminiRequest.kt (The Payload)**

These data classes model the JSON structure required by the Gemini API for multimodal (text \+ image) input.

* The structure is GeminiRequest \-\> Content \-\> List\<Part\>.  
* The List\<Part\> must contain two objects:  
  1. A Part with the text field (the prompt).  
  2. A Part with the inlineData field (the Base64 image).

### **3.3. GeminiResponse.kt (The Result)**

These data classes model the JSON response from the API.

* The structure is GeminiResponse \-\> List\<Candidate\> \-\> Content \-\> List\<Part\>.  
* The application logic is designed to parse this structure to extract candidates\[0\].content.parts\[0\].text, which contains the animal name.

### **3.4. GeminiApiClient.kt (The Client)**

This is the Retrofit singleton object that assembles the components.

* It sets the BASE\_URL to https://generativelanguage.googleapis.com/.  
* It configures an OkHttpClient with a HttpLoggingInterceptor for debugging network traffic.  
* It builds and lazy-initializes the GeminiService instance (api) that the rest of the app can call.

## **4\. Execution Flow (Step-by-Step)**

The entire process is orchestrated by the fetchGeminiResult() function within ResultActivity.kt.

1. **Trigger:** The user taps the btnGeminiApi (View Gemini Result) button.  
2. **State Check:** The app checks if remote results have already been fetched. If not, fetchGeminiResult() is called.  
3. **Show Loading:** loadingLayout is made VISIBLE.  
4. **Load Bitmap:** The Bitmap is loaded from the Uri passed in the Intent.  
5. **Encode Image:** encodeImageToBase64(bitmap) is called. This compresses the Bitmap to JPEG and encodes it as a Base64 string.  
6. **Define Prompt:** The GEMINI\_PROMPT constant is loaded:  
   Identify the animal in this image.  
   Respond with only the common name of the animal...

7. **Build Request:** A GeminiRequest object is built, packaging the GEMINI\_PROMPT (as text) and the base64Image (as inlineData) into the parts list.  
8. **Network Call:** The coroutine switches to Dispatchers.IO. GeminiApiClient.api.generateContent(...) is called with the request and the geminiApiKey.  
9. **Parse Response:** The app awaits the GeminiResponse. The logic safely navigates the JSON and extracts the animal name string (e.g., "Lion") from the text field.  
10. **API Chaining:** This is a key design decision. Instead of trusting Gemini for a description, the app **chains** APIs. It takes the "Lion" string and immediately calls fetchWikiIntro("Lion"), which uses the separate WikiIntroClient to get a high-quality summary from Wikipedia.  
11. **Update State:** The RecognitionState is updated with the new remote data:  
    * remoteAnimalType \= "Lion" (from Gemini)  
    * remoteAnimalIntro \= "The lion (Panthera leo)..." (from Wikipedia)  
    * remoteDetailUrl \= "https://en.wikipedia.org/wiki/Lion"  
12. **Update UI:** showResult() is called, which hides the loading spinner and displays the remoteAnimalType and remoteAnimalIntro in the UI.

This architecture successfully decouples the recognition (Gemini) from the information retrieval (Wikipedia), creating a robust and maintainable system.