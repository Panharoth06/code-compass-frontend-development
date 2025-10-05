'use client'

import { useEffect, useState } from "react"
import { ProblemEditor } from "@/components/tiptap/text-editor" // your Tiptap editor

const TextEditor = () => {
    const [description, setDescription] = useState("");

    // const onsubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log(description); // HTML string
    //     alert(description);
    // }

    useEffect (() => {},[description]) 

    console.log(description)

    return (
            <ProblemEditor onChange={setDescription} />
    )
}

export default TextEditor
