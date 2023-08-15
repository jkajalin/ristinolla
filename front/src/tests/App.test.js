import React from 'react'
import { render, screen, within } from '@testing-library/react'
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

    // choosing paw
    const button = await screen.findByText('x')
    await user.click(button)

    const fieldbuttons = await screen.findAllByRole('button')

    // confirming paw x is chosen
    const element = screen.getByText('Pelaaja x aloittaa pelin')
    expect(element).toBeDefined()

    // first move
    await fieldbuttons[0].click()
    
    //const xbutton = await screen.findAllByRole('button', {value: 'x'} )
    const xbutton = await screen.findAllByText('x')

    // confirming first move is made
    //expect(xbutton).toBeDefined()
    expect(xbutton).toHaveLength(1)
  })

  test('Game could be reseted by button', async () => {
    
    const mycontainer = render(<App />).container

    const user = userEvent.setup()    

    // reseting game // somehow there seems to be active values from previous tests
    const restartbutton = await screen.findByText('Restart game')
    await user.click(restartbutton)

    // choosing paw
    const button = await screen.findByText('x')
    await user.click(button)

    const fieldbuttons = await screen.findAllByRole('button')

    // confirming paw x is chosen
    const element = screen.getByText('Pelaaja x aloittaa pelin')
    expect(element).toBeDefined()

    // first move
    await fieldbuttons[0].click()
    
    //const xbutton = await screen.findAllByRole('button', {value: 'x'} )
    const xbutton = await screen.findAllByText('x')

    // confirming first move is made
    //expect(xbutton).toBeDefined()
    expect(xbutton).toHaveLength(1)
    

    // reseting game
    const restartbutton02 = await screen.findByText('Restart game')
    await user.click(restartbutton02)

    const element02 = await screen.findByText('Valitse pelimerkki')
    expect(element02).toBeDefined()

    
    const gamerfield = mycontainer.querySelector('#buttongamefield')

    // checking that gamefield is empty
    const xfields = within(gamerfield).queryAllByText('x')

  
    expect(xfields.length).toBe(0)

    //screen.debug(xfields)    

  })
 

})