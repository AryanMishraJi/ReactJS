import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [pass, setPass] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed)str += "0123456789"
    if(charAllowed)str += "!@#$%^&*"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length +1)
      pass += str.charAt(char)
    }

    setPass(pass);

  },[length,numAllowed,charAllowed,setPass])

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(pass)
  },[pass])

  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-4 my-8 text-orange-500 bg-gray-500">
        <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-6 my-8 bg-gray-800 text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center text-orange-400">Password Generator</h2>
          
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Generated Password" 
              value={pass} 
              readOnly 
              className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-300"
              ref = {passwordRef}
            />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow" onClick = {copyToClipboard}>
              Copy
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Length: {length}</label>
            <input 
              type="range" 
              min={8} 
              max={100} 
              value={length} 
              onChange={(e) => { setlength(e.target.value) }} 
              className="w-full accent-orange-500"
            />
          </div>

          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              defaultChecked={numAllowed}
              className="h-4 w-4 text-orange-500 border-gray-600 focus:ring-orange-500" 
              onChange={() => setNumAllowed(!numAllowed)}
            />
            <label className="ml-2 text-sm font-medium">Include Numbers</label>
          </div>

          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-orange-500 border-gray-600 focus:ring-orange-500" 
              onChange={() => setCharAllowed(!charAllowed)}
            />
            <label className="ml-2 text-sm font-medium">Include Special Characters</label>
          </div>
        </div>
    </div>

    </>
  )
}

export default App
