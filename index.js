"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var APP_KEY = "dc144977-cef6-4f85-a331-3e2a57abeec7";
var APP_SECRET = "RGZyiBUwGkqR+bCysx97WA==";
var ENVIRONMENT = "sandbox.sinch.com";
var utils = require("utils/utils");
var stack_layout_1 = require("ui/layouts/stack-layout");
var label_1 = require("ui/label");
var Sinch = (function (_super) {
    __extends(Sinch, _super);
    function Sinch() {
        var _this = _super.call(this) || this;
        _this.initClientWithUserId("Rick");
        _this.createUI();
        return _this;
    }
    Sinch.prototype.createUI = function () {
        console.log("_createUI this: " + this);
        var lbl = new label_1.Label();
        lbl.text = "new message";
        this.addChild(lbl);
    };
    Sinch.prototype.initClientWithUserId = function (userId) {
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
        });
        this.sinchClient.addSinchClientListener(sinchClientListener);
        this.sinchClient.start();
    };
    Sinch.prototype.terminateClient = function () {
        this.sinchClient.stopListeningOnActiveConnection();
        this.sinchClient.terminate();
    };
    Sinch.prototype.sendMessage = function (recipientUserId, textBody) {
        var messageClient = this.sinchClient.getMessageClient();
        var _messageClientListener = new com.sinch.android.rtc.messaging.MessageClientListener({
            onIncomingMessage: function (client, message) {
                console.log("onIncomingMessage");
            },
            onMessageDelivered: function (client, deliveryInfo) {
                console.log("onMessageDelivered");
                console.log("The message with id " + deliveryInfo.getMessageId()
                    + " was delivered to the recipient with id" + deliveryInfo.getRecipientId());
            },
            onMessageFailed: function (client, message, failureInfo) {
                console.log("onMessageFailed");
                console.log("Failed to send to user: " + failureInfo.getRecipientId()
                    + " because: " + failureInfo.getSinchError());
            },
            onMessageSent: function (client, message, deliveryId) {
                console.log("onMessageSent");
            },
            onShouldSendPushData: function (client, message, pushPairs) {
                console.log("onShouldSendPushData");
            },
        });
        messageClient.addMessageClientListener(_messageClientListener);
        var message = new com.sinch.android.rtc.messaging.WritableMessage(recipientUserId, textBody);
        messageClient.send(message);
    };
    return Sinch;
}(stack_layout_1.StackLayout));
exports.Sinch = Sinch;
//# sourceMappingURL=index.js.map