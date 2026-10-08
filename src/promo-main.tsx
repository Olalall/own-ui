import React from "react"
import { createRoot } from "react-dom/client"
import Promo from "./Promo"
import "./showcase.css"
import "./promo.css"

createRoot(document.getElementById("root")!).render(<React.StrictMode><Promo /></React.StrictMode>)
