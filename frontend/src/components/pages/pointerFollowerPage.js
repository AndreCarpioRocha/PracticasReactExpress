import { PointerFollower } from "../pointer/pointerFollower";
import { useEffect, useState } from "react";
import "./pointerFollowerPage.css"
import { Header } from "../header/header";
import { SettingMenu } from "../pointer/settingsMenu";

export const PointerFollowerPage = () => {

    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)
    const [visible, setViseble] = useState(false);
    const [background, setBackGround] = useState("#fa1905")
    const [borderColor, setBorderColor] = useState("#fa0404")
    const [size, setSize] = useState(40)
    const [transparecy, setTransperency] = useState(0.22);



    const rgbaColor = (colorHex, transparency) => {
        const r = parseInt(colorHex.substring(1, 3), 16);
        const g = parseInt(colorHex.substring(3, 5), 16);
        const b = parseInt(colorHex.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${transparency})`;
    };



    useEffect(() => {
        const addSelectionStyle = (background) => {
            let styleElement = document.createElement("style");
            styleElement.id = "dynamic-style-selection";
            styleElement.innerHTML = `
                ::selection{
                    background-color : ${background}
                }
            `;
            document.head.appendChild(styleElement)
        }

        if (document.head.querySelector('#dynamic-style-selection')) {
            document.head.removeChild(document.head.querySelector('#dynamic-style-selection'));
        }

        if (visible) {
            addSelectionStyle(rgbaColor(background, transparecy))
        }


    }, [background, transparecy, visible])

    useEffect(() => {
        const handleMove = (event) => {
            setPosition({ x: event.clientX, y: event.clientY })
        }
        const handlesetOpacity = (event) => {
            if (visible) {
                setOpacity(1);
            }
        }
        const handleHide = (event) => {
            setOpacity(0);
        }

        window.addEventListener("pointermove", handleMove)
        document.querySelector("body").addEventListener("pointerleave", handleHide)
        document.querySelector("body").addEventListener("pointerenter", handlesetOpacity)

        return (() => {
            window.removeEventListener("pointermove", handleMove)
            document.querySelector("body").removeEventListener("pointerleave", handleHide)
            document.querySelector("body").removeEventListener("pointerenter", handlesetOpacity)
        })

    }, [visible])

    const handleVisible = () => {
        setViseble(!visible);
        if (!visible) {
            setOpacity(1)
        } else {
            setOpacity(0)
        }
    }

    const handleSelection = () => {

    }

    return (
        <>
            <Header></Header>
            <h1 className="titulo">Pointer Follower</h1>
            <SettingMenu size={size} background={background} transparecy={transparecy} borderColor={borderColor} setBackGround={setBackGround} setBorderColor={setBorderColor} setSize={setSize} setTransperency={setTransperency}></SettingMenu>

            <p style={{ fontWeight: "bold" , color: "#555", textAlign: "center" , fontSize : "30px", margin: "200px 0px"}}>
            🔍 Select this text with your cursor to discover something interesting (Activate Pointer Follower)
            </p>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}  >
                <button onClick={handleVisible}> {
                    visible ? "Desactivar Pointer Follower" : "Activar Pointer Follower"
                }</button>
            </div>

          

            <PointerFollower position={position} opacity={opacity} background={rgbaColor(background, transparecy)} borderColor={borderColor} size={size} />
        </>
    )
}