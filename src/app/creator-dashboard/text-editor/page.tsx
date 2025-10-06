'use client'

import { useEffect, useState } from "react"
import { ProblemEditor } from "@/components/tiptap/text-editor" 

const TextEditor = () => {
    const [description, setDescription] = useState("");

    useEffect (() => {},[description]) 

    console.log(description)

    return (<ProblemEditor onChange={setDescription} />)
}

export default TextEditor
