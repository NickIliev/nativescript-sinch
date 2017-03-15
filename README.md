# POC NativeScript plugin for using Sinch! SDK for implementing phone calls, video calls and messaging in your application.


> Disclaimer: this is POC plugn in alpha state.

## Steps (Android)

- registed at [https://www.sinch.com/](https://www.sinch.com/)

- download from here the Android .aar SDK file named omething like `sinch-android-rtc-3.9.14.aar` and place it in `platforms/android`. 

- provide `APP_KEY`, `APP_SECRET` and `ENVIRONMENT` in index.ts and run `tsc` to transpile the files to JavaScript

- add the plugin to your NativeScript application with
`tns plugin add <path-to-plugun>`

- the SDK neeeds the following permissions in your application (this can also be added as a logic taht comes from the plugin)
```
	<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
	<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
	<uses-permission android:name="android.permission.INTERNET"/>
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
	<uses-permission android:name="android.permission.RECORD_AUDIO" />
	<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
	<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```
