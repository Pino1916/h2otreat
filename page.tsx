"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Droplets, FlaskRoundIcon as Flask } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function WastewaterGame() {
  const [selectedPokemon, setSelectedPokemon] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [showInput, setShowInput] = useState(false)
  const [inputLabel, setInputLabel] = useState("")
  const [result, setResult] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  const pokemonOptions = [
    {
      value: "squirtle",
      name: "Squirtle",
      treatment: "pH Reduction (Sulfuric Acid)",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    },
    {
      value: "bulbasaur",
      name: "Bulbasaur",
      treatment: "pH Increase (Sodium Hydroxide)",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    },
    {
      value: "charmander",
      name: "Charmander",
      treatment: "BOD Reduction (Alum)",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    },
    {
      value: "pikachu",
      name: "Pikachu",
      treatment: "COD Reduction (Potassium Permanganate)",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    },
    {
      value: "vaporeon",
      name: "Vaporeon",
      treatment: "Water Distribution",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png",
    },
  ]

  const handlePokemonChange = (value: string) => {
    setSelectedPokemon(value)
    setResult("")
    setShowInput(false)
  }

  const handleCalculateClick = () => {
    if (!selectedPokemon) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }

    setShowAlert(false)

    switch (selectedPokemon) {
      case "squirtle":
        setInputLabel("Enter current pH level (0-14):")
        break
      case "bulbasaur":
        setInputLabel("Enter current pH level (0-14):")
        break
      case "charmander":
        setInputLabel("Enter current BOD level (mg/L):")
        break
      case "pikachu":
        setInputLabel("Enter current COD level (mg/L):")
        break
      case "vaporeon":
        setInputLabel("Enter total water volume (m³):")
        break
    }

    setShowInput(true)
  }

  const handleCalculation = () => {
    const value = Number.parseFloat(inputValue)

    if (isNaN(value)) {
      setResult("Please enter a valid number.")
      return
    }

    let calculationResult = ""

    switch (selectedPokemon) {
      case "squirtle":
        if (value < 0 || value > 14) {
          calculationResult = "pH must be between 0 and 14."
        } else if (value <= 7) {
          calculationResult = "The water is already acidic or neutral. No sulfuric acid needed."
        } else {
          const acidAmount = ((value - 7) * 0.05).toFixed(2)
          calculationResult = `To reduce pH from ${value} to 7 (neutral), add approximately ${acidAmount} g/L of sulfuric acid. Squirtle's Water Gun helps mix the solution evenly!`
        }
        break

      case "bulbasaur":
        if (value < 0 || value > 14) {
          calculationResult = "pH must be between 0 and 14."
        } else if (value >= 7) {
          calculationResult = "The water is already neutral or alkaline. No sodium hydroxide needed."
        } else {
          const baseAmount = ((7 - value) * 0.04).toFixed(2)
          calculationResult = `To increase pH from ${value} to 7 (neutral), add approximately ${baseAmount} g/L of sodium hydroxide. Bulbasaur's Vine Whip ensures thorough mixing!`
        }
        break

      case "charmander":
        if (value < 0) {
          calculationResult = "BOD cannot be negative."
        } else {
          const alumAmount = (value * 0.1).toFixed(2)
          const reduction = (value * 0.6).toFixed(2)
          calculationResult = `To reduce BOD from ${value} mg/L, add ${alumAmount} g/L of alum. This should reduce BOD by approximately ${reduction} mg/L. Charmander's heat accelerates the flocculation process!`
        }
        break

      case "pikachu":
        if (value < 0) {
          calculationResult = "COD cannot be negative."
        } else {
          const permanganateAmount = (value * 0.15).toFixed(2)
          const reduction = (value * 0.7).toFixed(2)
          calculationResult = `To reduce COD from ${value} mg/L, add ${permanganateAmount} g/L of potassium permanganate. This should reduce COD by approximately ${reduction} mg/L. Pikachu's electric charge enhances the oxidation reaction!`
        }
        break

      case "vaporeon":
        if (value < 0) {
          calculationResult = "Volume cannot be negative."
        } else {
          const primary = (value * 0.3).toFixed(2)
          const secondary = (value * 0.4).toFixed(2)
          const tertiary = (value * 0.3).toFixed(2)
          calculationResult = `For optimal treatment of ${value} m³ of water, distribute as follows:
          - Primary treatment: ${primary} m³
          - Secondary treatment: ${secondary} m³
          - Tertiary treatment: ${tertiary} m³
          Vaporeon's Water Absorption ability helps regulate flow between reservoirs!`
        }
        break
    }

    setResult(calculationResult)
  }

  const getSelectedPokemonImage = () => {
    const pokemon = pokemonOptions.find((p) => p.value === selectedPokemon)
    return pokemon ? pokemon.image : ""
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-blue-950 flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20">
          <Droplets size={80} className="text-blue-400" />
        </div>
        <div className="absolute bottom-10 right-10 w-20 h-20">
          <Flask size={80} className="text-teal-400" />
        </div>
      </div>

      <Card className="w-full max-w-md p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-blue-500 shadow-lg shadow-blue-900/20">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Wastewater Treatment Game
          </h1>
          <p className="text-gray-400 mt-1">Learn with Pokémon specialists</p>
        </div>

        {showAlert && (
          <Alert variant="destructive" className="mb-4 border-red-500 bg-red-950/50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Please select a Pokémon first!</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="pokemon-select" className="text-gray-300">
              Select a Pokémon Treatment Specialist:
            </Label>
            <Select onValueChange={handlePokemonChange} value={selectedPokemon}>
              <SelectTrigger id="pokemon-select" className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Choose a Pokémon" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {pokemonOptions.map((pokemon) => (
                  <SelectItem key={pokemon.value} value={pokemon.value}>
                    {pokemon.name} - {pokemon.treatment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPokemon && (
            <div className="flex justify-center my-4">
              <div className="w-40 h-40 bg-gradient-to-br from-blue-900/50 to-teal-900/50 rounded-full overflow-hidden flex items-center justify-center p-1 border border-blue-500/30 shadow-lg shadow-blue-900/20">
                <img
                  src={getSelectedPokemonImage() || "/placeholder.svg"}
                  alt={pokemonOptions.find((p) => p.value === selectedPokemon)?.name || "Pokemon"}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          )}

          <Button
            onClick={handleCalculateClick}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transition-all duration-300"
          >
            Calculate
          </Button>

          {showInput && (
            <div className="space-y-2 bg-gray-800/50 p-3 rounded-md border border-gray-700">
              <Label htmlFor="input-value" className="text-gray-300">
                {inputLabel}
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="input-value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                  placeholder="Enter value"
                />
                <Button onClick={handleCalculation} className="bg-blue-600 hover:bg-blue-700">
                  Submit
                </Button>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-gradient-to-br from-gray-800/80 to-blue-900/30 rounded-md border border-blue-500/30 shadow-inner">
              <h3 className="font-semibold text-blue-400 mb-2">Treatment Results:</h3>
              <p className="whitespace-pre-line text-gray-200">{result}</p>
            </div>
          )}
        </div>
      </Card>

      <div className="mt-8 max-w-md text-gray-300 text-sm bg-gray-900/70 p-5 rounded-lg border border-blue-900/30">
        <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 mb-3">
          How Wastewater Treatment Works
        </h2>
        <p className="mb-3 text-gray-400">
          Wastewater treatment is a multi-stage process that removes contaminants from sewage and wastewater:
        </p>
        <ul className="space-y-2">
          {[
            { name: "Primary Treatment", desc: "Physical removal of solids through screening and sedimentation" },
            { name: "Secondary Treatment", desc: "Biological processes to remove dissolved organic matter" },
            { name: "Tertiary Treatment", desc: "Advanced filtration and chemical processes for final polishing" },
            { name: "pH Adjustment", desc: "Using acids or bases to neutralize water to protect aquatic life" },
            { name: "BOD/COD Reduction", desc: "Removing oxygen-demanding substances to prevent water pollution" },
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                <Droplets size={14} className="text-blue-400" />
              </div>
              <div>
                <span className="text-blue-400 font-medium">{item.name}:</span>{" "}
                <span className="text-gray-400">{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-xs">
        <p>Created for educational purposes. Pokémon characters are property of Nintendo/Game Freak.</p>
        <p className="mt-1">© {new Date().getFullYear()} Wastewater Treatment Game</p>
      </footer>
    </div>
  )
}

