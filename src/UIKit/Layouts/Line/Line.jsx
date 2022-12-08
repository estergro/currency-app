import './Line.css'

export const Line = (props) => {
 const getClassName = () =>{

    return ('Line ' + (props.type || '')).trim();
 }
    return (
        <div className={getClassName()}>
           {props.children}
        </div>

    )
}

export const Between = (props) => {
    return <Line {...props} type="between"></Line>
}

export default Line;