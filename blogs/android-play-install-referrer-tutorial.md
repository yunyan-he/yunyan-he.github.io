# **Tracking App Install Sources on Android with the Play Install Referrer Library**

## **Basic Introduction**

When promoting an app, various channels are used to direct users to Google Play for download. To analyze the effectiveness of these promotions, you can retrieve the referral source information from Google Play and pass this data into your app.

## **Use Cases for the Play Install Referrer Library**

* **Multi-Channel Ad Campaigns:** When an app is advertised across multiple channels, the Play Install Referrer library can be used to analyze which ad channel led to the download.  
* **Installation Source Analysis:** Developers can use this library to record the app's download source to optimize marketing strategies and ad spend.  
* **Ad Performance Evaluation:** By understanding the installation source from each channel, the effectiveness of advertising campaigns can be assessed.

## **Features**

* **Securely Retrieve Referral Information:** The Play Install Referrer library allows you to securely obtain the app's installation source information from Google Play.  
* **Pass Referral Information:** The retrieved referral source information is passed to the app for further processing and analysis.

## **How to Use**

### **1\. Add Dependency**

You need to add the dependency in the dependencies block of your project's app module build.gradle file:

```gradle
dependencies {  
    implementation("com.android.installreferrer:installreferrer:2.2")  
}
```

### **2\. Connect to Google Play**

Since you need to get information from the Google Play Store, you must first connect to Google Play.

Call the newBuilder() method to create an instance of the InstallReferrerClient class. The InstallReferrerClient class is responsible for communicating with Google Play services and obtaining the app's install source information.

```kotlin
val referrerClient = InstallReferrerClient.newBuilder(context).build()
```

Call startConnection() to establish a connection with Google Play. This method is asynchronous and will invoke a callback method upon successful connection or error. Therefore, you must implement the InstallReferrerStateListener interface to handle callback events after the connection is complete.

```kotlin
referrerClient.startConnection(object : InstallReferrerStateListener {  
    override fun onInstallReferrerSetupFinished(responseCode: Int) {  
        // Handle connection result  
    }

    override fun onInstallReferrerServiceDisconnected() {  
        // Handle connection disconnection  
    }  
})
```

### **3\. Implement the Interface Methods**

Implement the onInstallReferrerSetupFinished() method. This method is called when the connection process is finished. Check the responseCode to determine the connection status. OK indicates a successful connection. Other InstallReferrerResponse constants indicate different types of errors.

```kotlin
override fun onInstallReferrerSetupFinished(responseCode: Int) {  
    when (responseCode) {  
        InstallReferrerResponse.OK -> {  
            // Connection successful, can get install referrer info  
        }  
        InstallReferrerResponse.FEATURE_NOT_SUPPORTED -> {  
            // The Play Store app on the current device doesn't support this API  
        }  
        InstallReferrerResponse.SERVICE_UNAVAILABLE -> {  
            // Connection could not be established, possibly a network issue  
        }  
    }  
}
```

Implement the onInstallReferrerServiceDisconnected() method to handle disconnections from Google Play. For example, the connection might be lost if the Play Store service is updated in the background. When the connection is lost, you need to call startConnection() again to re-establish the connection and ensure you can continue sending requests.

```kotlin
override fun onInstallReferrerServiceDisconnected() {  
    // Restart connection when connection is lost  
    referrerClient.startConnection(this)  
}
```

### **4\. Get the Install Referrer**

In the onInstallReferrerSetupFinished method, if the connection is successful (responseCode is InstallReferrerResponse.OK), proceed to get the installation information within this logic block.

```kotlin
val response: ReferrerDetails = referrerClient.installReferrer  
val referrerUrl: String = response.installReferrer  
val referrerClickTime: Long = response.referrerClickTimestampSeconds  
val appInstallTime: Long = response.installBeginTimestampSeconds  
val instantExperienceLaunched: Boolean = response.googlePlayInstantParam
```

* The ReferrerDetails object contains detailed information about the app's install referrer.  
* referrerUrl can contain detailed information about where the user downloaded the app, such as ad campaign parameters.  
* The referrerClickTimestampSeconds attribute returns a long value representing the timestamp (in seconds) when the user clicked the ad link.  
* The installBeginTimestampSeconds attribute returns a long value representing the timestamp (in seconds) when the app installation began.  
* The googlePlayInstantParam attribute returns a boolean value indicating whether the app was launched as an instant experience.

ReferrerDetails | Android Developers provides many methods for getting variables.

### **5\. Disconnect**

After retrieving the referrer information, it is recommended to call the endConnection() method on the InstallReferrerClient instance to disconnect. Disconnecting helps prevent leaks and performance issues.

## **Usage Example**

After adding the dependency, create a new InstallReferrerUtils object to handle Google Play install referrer information in the Android app.

Any file that wants to use this class can import it and then call its initialization function. You can then use getReferrerInfo() to get the information and perform corresponding actions, such as storage or analysis.

```kotlin
// Use InstallReferrerUtils in MainActivity's onCreate method

// Initialize InstallReferrerUtils  
InstallReferrerUtils.INSTANCE.init(this);  
// Custom code to display referrer info  
displayReferrerInfo();
```

```kotlin
// InstallReferrerUtils class code  
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

    private var referrerClient: InstallReferrerClient? \= null  
    private var referrerInfo: String \= "No referrer information available."

    private val installReferrerStateListener \= object : InstallReferrerStateListener {  
        override fun onInstallReferrerSetupFinished(responseCode: Int) {  
            if (responseCode \== InstallReferrerResponse.OK) {  
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

    private var reconnectHandler: Handler? \= null  
    private var reconnectHandlerThread: HandlerThread? \= null  
    private var reconnectRunnable \= Runnable { connectReferrerClient() }  
      
    init {  
        reconnectHandlerThread \= HandlerThread("InstallReferrerReconnectThread").apply {  
            start()  
            reconnectHandler \= Handler(looper)  
        }  
    }

    fun init(context: Context) {  
        if (referrerClient \== null) {  
            referrerClient \= InstallReferrerClient.newBuilder(context).build()  
        }  
        connectReferrerClient()  
    }

    private fun connectReferrerClient() {  
        referrerClient?.run {  
            if (\!isReady) {  
                startConnection(installReferrerStateListener)  
            }  
        }  
    }

    private fun handleInstallReferrerParams() {  
        referrerClient?.run {  
            if (isReady) {  
                val response: ReferrerDetails \= this.installReferrer  
                val installReferrer \= response.installReferrer  
                val installVersion \= response.installVersion  
                val installBeginTimestampSeconds \= response.installBeginTimestampSeconds  
                val installBeginTimestampServerSeconds \= response.installBeginTimestampServerSeconds  
                val referrerClickTimestampSeconds \= response.referrerClickTimestampSeconds  
                val referrerClickTimestampServerSeconds \= response.referrerClickTimestampServerSeconds  
                val googlePlayInstantParam \= response.googlePlayInstantParam  
                  
                referrerInfo \= "Install Referrer: $installReferrer\\n" \+  
                        "Install Version: $installVersion\\n" \+  
                        "Install Begin Time: $installBeginTimestampSeconds\\n" \+  
                        "Referrer Click Time: $referrerClickTimestampSeconds\\n" \+  
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
        reconnectHandlerThread \= null  
        reconnectHandler \= null  
        referrerClient \= null  
    }  
}
```

## **Results**

When running this locally (e.g., in an emulator), you will see a message indicating the app source was a local install.

<div class="mb-8">
  <img src="blogs/images/android-play-install-referrer-tutorial-image0.png" alt="Install referrer link preview" class="w-[60%] mx-auto rounded-md shadow" />
  <p class="text-center text-sm text-gray-600 mt-2"><em>Example of a install referrer link preview</em></p>
</div>



After setting up a closed test in the developer console, you get a download link:  
https://play.google.com/store/apps/details?id=com.cider  
Simulate referrer parameters by setting utm\_source, utm\_medium, utm\_campaign, etc., to get the following download link:  
https://play.google.com/store/apps/details?id=com.cider\&referrer=utm\_source%3Dsource\_example%26utm\_medium%3Dmedium\_example%26utm\_campaign%3Dcampaign\_example  
Clicking the link displays the Google Play download page. After downloading and opening the app, the result is as follows. As you can see, the app has successfully retrieved the referrer parameters from the link:


<div class="mb-8">
  <img src="blogs/images/android-play-install-referrer-tutorial-image1.png" alt="App referrer result" class="w-[60%] mx-auto rounded-md shadow" />
  <p class="text-center text-sm text-gray-600 mt-2"><em>App successfully retrieved referrer parameters</em></p>
</div>
