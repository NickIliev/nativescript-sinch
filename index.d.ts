import { StackLayout } from "ui/layouts/stack-layout";

declare module "nativescript-sinch" {

    export class Sinch extends StackLayout {

        public initWithUserId(userId: string): void

        public sendMessage(): void
    }

}