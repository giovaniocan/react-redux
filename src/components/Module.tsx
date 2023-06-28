import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import * as Collapsible from '@radix-ui/react-collapsible';
import { useStore } from "../zustand-store";

interface ModuleProps{
    title: string;
    amountOfLessons: number;
    moduleIndex: number;
}

export function Module({amountOfLessons, title, moduleIndex}:ModuleProps){
    const {currentLessonIndex, currentModuleIndex, play, isLoading, lessons} = useStore((store) => {
        return {
            lessons: store.course?.modules[moduleIndex].lessons,   
            currentLessonIndex: store.currentLessonIndex,
            currentModuleIndex: store.currentModuleIndex,
            play: store.play,
            isLoading: store.isLoading,
     }}
    )


    if(isLoading){
        return (
            <div className="flex flex-col gap-2 animate-pulse">
                <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                    <div className='flex h-10 w-10 rounded-full items-center justify-center bg-zinc-900 text-xs' />
                    <div className="flex flex-col w-full gap-1">
                        <div className='flex bg-zinc-900 w-1/3 h-4'/>
                        <div className='flex bg-zinc-900 w-1/4 h-4'/>
                    </div>
                    
                </div>
                <div className="flex flex-col w-full gap-1 bg-zinc-800">
                    <div className="w-full bg-zinc-950 h-8"/>
                    <div className="w-full bg-zinc-950 h-8"/>
                    <div className="w-full bg-zinc-950 h-8"/>
                </div>
            </div>
        )
    }

    
    return(
        <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
              <Collapsible.Trigger className='flex w-full items-center gap-3 bg-zinc-800 p-4'>
                    <div className='flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs'>{moduleIndex + 1}</div>
                    <div className='flex flex-col gap-1 text-left'>
                        <strong className='text-sm'>{title}</strong>
                        <span className='text-xs text-zinc-400'>{amountOfLessons} aulas</span>
                    </div> 
                    <ChevronDown className='w-5 h-5 ml-auto text-zinc-400  group-data-[state=open]:rotate-180 transition-transform'/>
              </Collapsible.Trigger>

               <Collapsible.CollapsibleContent >
                     <nav className='relative flex flex-col gap-4 p-6 '>
                       {lessons && lessons.map((lesson, lessonIndex) => {
                        const isCurrent = currentModuleIndex === moduleIndex &&
                                          currentLessonIndex === lessonIndex
                        return(
                            <Lesson 
                                title={lesson.title} 
                                duration={lesson.duration} 
                                key={lesson.id}
                                onPlay={() => play([moduleIndex, lessonIndex])}
                                isCurrent={isCurrent}
                             />
                                
                        )
                       })}
                    </nav>
                </Collapsible.CollapsibleContent>
        </Collapsible.Root>
    )
}