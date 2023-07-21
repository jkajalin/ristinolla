import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Ristinolla App test', function(){

  test('Render test, choose your pawn text is visible', () => {
    
    render(<App />)

    const element = screen.getByText('Valitse pelimerkki')

    expect(element).toBeDefined()
  })

  test('Pawn x could be chosen', async () => {
    
    render(<App />)

    const user = userEvent.setup()    

    const button = screen.getByText('x')
    await user.click(button)

    const element = screen.getByText('Pelaaja x aloittaa pelin')
    expect(element).toBeDefined()
  })

  test('Or pawn 0 could be chosen', async () => {
    
    render(<App />)

    const user = userEvent.setup()    

    const button = screen.getByText('0')
    await user.click(button)

    const element = screen.getByText('Pelaaja 0 aloittaa pelin')
    expect(element).toBeDefined()
  })

  test('First move could be made', async () => {
    
    render(<App />)

    const user = userEvent.setup()    

    const button = await screen.findByText('x')
    await user.click(button)

    const fieldbuttons = await screen.findAllByRole('button')

    const element = screen.getByText('Pelaaja x aloittaa pelin')
    expect(element).toBeDefined()

    await fieldbuttons[0].click()

    const xbutton = await screen.findAllByRole('button', {value: 'x'} )

    expect(xbutton).toBeDefined()
  })
 

})