"use client"
import React, { useEffect, useState } from 'react'
import data from '@/data.json'
import {useParams, useSearchParams} from 'next/navigation'
import ja from 'lodash'
import { useSnapshot } from 'valtio'
import { state } from '@/state'
import { Check, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast,{ Toaster} from 'react-hot-toast'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


export default function Domande() {
    let i = 0;

    function checkUno({file,id, func}:{file:string | null, id: string| string[], func:React.Dispatch<React.SetStateAction<any>> }){

        if(i==1 || id == "10"){
            i = 0
            return
        }

        let info = data[Number(file)].meta[Number(id)]

        info.risposte.push(info.rispostaCorretta)

        info.risposte = ja.shuffle(info.risposte)

        func(info)


        i++;


    }

    const file = useSearchParams().get("category")
    const {id} = useParams()
    const [risposta,setRisposta] = useState(0)
    const snap = useSnapshot(state)
    const [dati,setDati] = useState({
        domanda: "",
        rispostaCorretta:"",
        risposte:[]
    })

    const notifySuccess = () => {
        state.vinto++
        return toast.success("Risposta Corretta")
    }
    const notifyFailed = () => {
        state.perso++

        return toast.error("Risposta Sbagliata")
    }

    useEffect(()=>{

        if (file && id){
            checkUno({file,id, func: setDati})
        }

    },[file,id])

    if(Number(id) >= 10 ){
        return(
            <div className='h-screen w-screen flex items-center justify-center'>

                <Card>

                    <CardHeader>
                        <CardTitle>Congratulazioni</CardTitle>
                        <CardDescription>Bravo ad aver finito il quiz più hdas di sempre</CardDescription>
                    </CardHeader>

                    <CardContent className='grid grid-cols-2 grid-rows-2'>

                        <div className='text-green-500'>Wins</div>
                        <div className='text-red-500'>Lose</div>
                        <div>{state.vinto}</div>
                        <div>{state.perso}</div>

                    </CardContent>
                    <CardFooter>
                        <a href="/"><Button>Prova di nuovo</Button></a>
                    </CardFooter>
                </Card>

            </div>
        )
    }








  return (
    <div className='h-screen w-screen flex justify-center items-center'>

        <div className='flex flex-col w-[600px] gap-[22px]'>

            <div className='border-[2px] shadow-lg border-black text-center font-semibold text-[#232121] rounded-md w-full py-[34px] px-[94px]'>
                {dati?.domanda}
            </div>

            <div className='flex justify-end items-end w-full gap-[12px]'>
                <div className='Verifica'>
                    <Check color='green'/>
                    {snap.vinto}
                </div>
                <div className='Verifica'>
                    <XCircle color='red'/>
                    {snap.perso}
                </div>
            </div>

            <div className='flex flex-col gap-[20px]'>
                {dati?.risposte.map((e, i)=>(

                    <div key={i} onClick={()=> setRisposta(i)} className={`w-full border-[2px] shadow-md rounded-[8px] cursor-pointer border-black py-[19px] font-medium pl-[18px] gap-[11px] flex items-center text-[15px] ${risposta==i? "text-white/80 bg-[#1D1B1B]":"text-black/80 bg-white" }  `}>
                        <span className={`h-[17px] w-[17px] text-[10px] text-center rounded-[5px] border-[0.7px] ${ risposta ==i? "border-white":"border-black"} `}>{i+1}</span>{e}
                    </div>

                ))}
            </div>
            <Link href={`/domande/${Number(id)+1}?category=${file}`}>
                <Button className='w-full border-[2px] bg-[#7AF8A5] py-[10px] hover:bg-[#7AF8A5]/70 text-black border-black font-semibold' onClick={dati.risposte[risposta] == dati.rispostaCorretta ? notifySuccess : notifyFailed }>
                    Verifica
                </Button>
            </Link>

            <Toaster position="bottom-right" reverseOrder={false} toastOptions={{duration: 1500, }} />
        </div>

    </div>
  )
}
