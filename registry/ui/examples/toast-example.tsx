"use client"
import { UiToastProvider, UiToastHost, useUiToast } from "../own-ui-toast"
import { UiButton } from "../own-ui-button"
function Actions() {
  const toast = useUiToast()
  return <><UiButton onClick={() => toast.add({ title: "保存成功", description: "本地演示已保存，可关闭通知。", type: "success" })}>显示成功通知</UiButton>{" "}
    <UiButton variant="outline" onClick={() => toast.add({ id: "demo-error", title: "保存失败", description: "检查连接后重试。这个演示不发出真实请求。", type: "error", timeout: 0 })}>显示失败通知</UiButton>{" "}
    <UiButton variant="ghost" onClick={() => toast.close()}>清除通知</UiButton><UiToastHost placement="inline" /></>
}
export default function ToastExample() { return <UiToastProvider limit={3} timeout={5000}><Actions /></UiToastProvider> }
