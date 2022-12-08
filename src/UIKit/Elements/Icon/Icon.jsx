export const Icon =(props) =>{
    return(
        <button onClick={props.onClick} className="material-symbols-outlined">
        {props.i}
        </button>
    )
}

export default Icon;