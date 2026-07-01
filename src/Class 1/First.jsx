import { useState } from "react";
import "./first.css"
import { FaMoon, FaSun } from "react-icons/fa";

// This is Functional Component
export default function First(){
    return( // in this return we return our HTML
        <>
            {/* Fragment tag */}
            <h1>My First Component</h1>
        </>
    )
}

export function First1(){
    return(
        <>
            <h1>This is my Second Component</h1>
        </>
    )
}

export function StateComponent(){
    // let age=23;
    // useState() : current , bound dispatchSetState

    let [count,setCount]=useState(0);
    console.log(count)
    // console.log(setCount)

    // How HTML uses JS?
    // JS is written with {variableName}

    function increase(){
        setCount(count+1)
    }
    function decrease(){
        setCount(count-1)
    }
    function reset(){
        setCount(0);
    }
    return(
        <>
            <h1>State Component</h1>
            <div>
                <button onClick={increase}>+</button>
                <h2>{count}</h2>
                <button onClick={decrease}>-</button>
                <button onClick={reset}>Reset</button>
            </div>
        </>
    )
}


export function ConditionRendering(){
    const[status,setStatus]=useState(true);
    // true: hide , false : show

    console.log(status)
    return(
        <>
            <div>
                <button onClick={()=>{setStatus(!status)}}>
                    {
                        (status) ? "Hide Text" : "Show Text"
                    }
                </button>
                {status && <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam doloribus quos, consequatur aspernatur alias laborum eligendi blanditiis dignissimos porro sapiente architecto nihil illum nisi delectus odio esse accusamus modi nostrum impedit ipsa exercitationem facilis itaque! Distinctio iusto qui eligendi? Eveniet qui sed porro in. In eligendi quae iusto, quis laborum ipsam soluta sapiente repudiandae incidunt quisquam doloribus assumenda, modi eius tempora iure saepe ab dolorum dolore provident. Saepe, dicta aperiam. Eos quo, veniam dicta mollitia facilis beatae labore ducimus nisi sint delectus quis molestias atque cumque ratione cum dolore pariatur suscipit. Iusto fugit unde rem veritatis possimus suscipit magni ipsam hic animi voluptate corrupti neque, ratione reiciendis facilis nam asperiores ex, cum tempore iure, consectetur officia quos error. Libero, minima laborum. Adipisci illo vitae veritatis consequuntur, veniam commodi excepturi, facere voluptate blanditiis sunt tenetur est quidem ad fugit, tempore sit dicta porro qui harum nostrum quod sapiente molestiae aliquam culpa. Tempore nihil amet hic dolore incidunt maxime magnam laborum ipsam, enim, laboriosam voluptatem quis! Consectetur nam blanditiis voluptatum nobis incidunt id deserunt ullam quam. Reprehenderit repudiandae eligendi, corporis asperiores saepe numquam ab ipsa quam! Recusandae aut dolorum inventore quasi quod veniam officiis, ducimus, quia dolor veritatis ratione explicabo adipisci sunt.
                </p>}
            </div>
        </>
    )
}

export function ThemeComponent(){
    const[theme,setTheme]=useState(true)
    return(
        <>
            <div className={(theme)?"dark":"light"}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h1>Logo</h1>
                    <div>
                        {   (theme)?
                            <FaSun onClick={()=>{setTheme(!theme)}} color="yellow" size="40"/>:
                        <FaMoon onClick={()=>{setTheme(!theme)}} color="black" size="40"/>}
                    </div>
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, numquam amet sed exercitationem facilis ut voluptatum totam unde repellat ullam odio, culpa quod nihil neque, quas in. Delectus saepe perspiciatis, iste fuga assumenda culpa distinctio asperiores accusamus commodi minus eum deserunt ea maxime praesentium ducimus eveniet quibusdam hic aliquam. Ipsam neque, quam laudantium debitis eum animi deserunt sequi placeat provident voluptatum sit ipsum exercitationem error? Magni, obcaecati cum! Voluptates, atque voluptatibus? Aliquam nesciunt, nulla magni vel ipsa minima perspiciatis iste eaque molestias consequatur assumenda autem incidunt accusantium officia ut cupiditate voluptates eum harum quaerat nam ex similique, doloribus, accusamus explicabo!
                </p>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid repellat provident deleniti tenetur. Voluptas quod saepe quibusdam fuga, architecto quisquam debitis voluptatem impedit. Commodi iste mollitia dignissimos soluta adipisci? Inventore officia vel dolorem? Accusantium officia sequi dicta quod, commodi eveniet excepturi repellendus itaque vel dolorum dolorem expedita aut fuga omnis aspernatur! Esse a aliquid laboriosam ratione labore fuga! Aut, sapiente maiores similique dignissimos, voluptatibus quibusdam a quasi in unde recusandae hic officia maxime ratione fugit officiis. Quasi, unde. Mollitia aliquam asperiores porro quidem blanditiis velit repellendus recusandae, saepe, aspernatur sint exercitationem est quas soluta dicta, eum dolores accusamus? Eos, facere.
                </p>
            </div>
        </>
    )
}