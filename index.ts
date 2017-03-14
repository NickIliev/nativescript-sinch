// https://download.sinch.com/docs/android/latest/reference/index.html

declare var com: any;
declare var android: any;

const APP_KEY = "dc144977-cef6-4f85-a331-3e2a57abeec7";
const APP_SECRET = "RGZyiBUwGkqR+bCysx97WA==";
const ENVIRONMENT = "sandbox.sinch.com";

import * as utils from "utils/utils";
import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";

export class Sinch extends StackLayout {
    public sinchClient: any;

    constructor() {
        super();

        this.initClientWithUserId("Rick");
        this.createUI();
    }

    public createUI() {
        
        console.log("_createUI this: " + this)


        // example for how to structure your messaging UI
        var lbl = new Label();
        lbl.text = "new message";
        this.addChild(lbl);

    }

    public initClientWithUserId(userId: string) {
        console.log("on initClientWithUserId");
        var context = utils.ad.getApplicationContext();

        this.sinchClient = com.sinch.android.rtc.Sinch.getSinchClientBuilder().context(context)
            .applicationKey(APP_KEY)
            .applicationSecret(APP_SECRET)
            .environmentHost(ENVIRONMENT)
            .userId(userId)
            .build();

        this.sinchClient.setSupportMessaging(true);

        var sinchClientListener = new com.sinch.android.rtc.SinchClientListener({
            onClientStarted: function (client) {
                console.log("onClientStarted");
            },
            onClientFailed: function (client, error) {
                console.log("onClientFailed");
                console.log("error: " + error);
            },
            onRegistrationCredentialsRequired: function (client, registrationCallback) {
                console.log("onRegistrationCredentialsRequired");
            },
            onLogMessage: function (level, area, message) {
                console.log("onLogMessage");
                console.log("level: " + level);
                console.log("area: " + area);
                console.log("message: " + message);
            }
        })

        this.sinchClient.addSinchClientListener(sinchClientListener);
        this.sinchClient.start();
    }

    public terminateClient() {
        this.sinchClient.stopListeningOnActiveConnection();
        this.sinchClient.terminate();
    }

    public sendMessage(recipientUserId, textBody) {
        var messageClient = this.sinchClient.getMessageClient();

        var _messageClientListener = new com.sinch.android.rtc.messaging.MessageClientListener({
            onIncomingMessage: function (client, message) {
                console.log("onIncomingMessage");
                // Persist message
                // Update UI
            },
            onMessageDelivered: function (client, deliveryInfo) {
                console.log("onMessageDelivered");
                console.log("The message with id " + deliveryInfo.getMessageId()
                    + " was delivered to the recipient with id" + deliveryInfo.getRecipientId())
            },
            onMessageFailed: function (client, message, failureInfo) {
                console.log("onMessageFailed");
                console.log("Failed to send to user: " + failureInfo.getRecipientId()
                    + " because: " + failureInfo.getSinchError())
            },
            onMessageSent: function (client, message, deliveryId) {
                console.log("onMessageSent");
                // Persist message
                // Update UI
            },
            onShouldSendPushData: function (client, message, pushPairs) {
                console.log("onShouldSendPushData");
            },
        });

        messageClient.addMessageClientListener(_messageClientListener);

        // Create a WritableMessage
        var message = new com.sinch.android.rtc.messaging.WritableMessage(recipientUserId, textBody);

        // Send it
        messageClient.send(message);
    }
}

