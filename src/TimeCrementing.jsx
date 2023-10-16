/* eslint-disable react/prop-types */
function TimeCrementing({title, time, changeTimer, formatTime, type}) {
   
    return (
        <div 
        className="crementing">
            <h2>{title}</h2>
            <div 
            className="bothcrementing ">
                <button
                  onClick={()=> changeTimer(60, type)} 
                className="up">
                    ▶
                </button>
                
                <h1>{formatTime(time)}</h1>
                <button 
                onClick={()=> changeTimer(-60, type)} 
                className="down">
                    ▶
                </button>
            </div>
            </div>

    )
}

export default TimeCrementing