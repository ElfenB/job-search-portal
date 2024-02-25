import { Capacitor } from "@capacitor/core";

export const isNative = Capacitor.getPlatform() !== "web";
