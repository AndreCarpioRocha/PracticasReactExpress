import "./pointerFollower.css";
export const PointerFollower = ({ position, opacity, background, borderColor,size }) => {

    return (
        <div style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
            opacity: opacity,
            backgroundColor: `${background}`,
            borderColor: borderColor,
            height: `${size}px`,
            width: `${size}px`
        }} className="pointerFollower">
        </div>
    )
}