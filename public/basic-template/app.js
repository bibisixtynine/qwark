/////////////////////
// Ma Première App //
/////////////////////

import {clear, print} from './toolbox.js'
 
clear()

print('<h1>😁 hello ! </h1><br>')

let i=1

setInterval( ()=> {
  print(i,',')
  i++;
}, 1000)

print('😎')
    