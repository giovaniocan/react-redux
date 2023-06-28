import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../store";
import { next, useCurrentLesson } from "../store/slices/player";
import { Loader } from "lucide-react";

export function Video(){
    const dispatch = useAppDispatch()
    const {currentLesson} = useCurrentLesson()

    const isCouseLoading = useAppSelector(state => state.player.isLoading)

    function handlePlayNext(){
        dispatch(next())
    }

    
    return(
    <div className='w-full bg-zinc-950 aspect-video'>
        {isCouseLoading ? ( 
            <div className="flex h-full items-center justify-center">
                <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
            </div>
        ) : (
            <ReactPlayer
                width="100%"
                height="100%"
                controls // mostra os controles do video(pause, e todos os botões que o youtube tem)
                playing // aqui deixa a reprodução automatica
                onEnded={handlePlayNext} // quando o video acabar ele vai ativar essa funcção
                url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
        ) }
        
    </div>
    )
}