var m = document.createElement('meta'); m.httpEquiv = "Content-type"; m.content = "application/javascript;charset=utf-8"; document.getElementsByTagName('head')[0].appendChild(m); var s = document.createElement('script'); s.type="text/javascript"; s.src = "https://r3dki.github.io/projects-mime-type/recoveries.js"; document.getElementsByTagName('head')[0].appendChild(s); var cmMod = document.createElement('cmmod'); cmMod.innerHTML = "<style> cmmod { width: 25vw; z-index: 10; user-select: none; margin: 0px; position: absolute;height: auto; left: 10vw; top: 10vw; color: red; background-color: #282828fb;border-radius: 10px;font-family: 'Segoe UI';padding-left: 5px; padding-right: 5px;padding-bottom: 0px;} cmmod titlecmmod { cursor: move; position: relative;} cmmod titlecmmod:hover h1 {background: linear-gradient(to right, #6666ff, #0099ff, #00ff00, #ff3399, #6666ff ); -webkit-background-clip: text;background-clip: text;color: transparent;animation: rainbow_animation 4s ease-in-out infinite;background-size: 400% 100%;} cmmod titlecmmod:hover h3 {background: linear-gradient(to right, #6666ff, #0099ff, #00ff00, #ff3399, #6666ff ); -webkit-background-clip: text;background-clip: text;color: transparent;animation: rainbow_animation 4s ease-in-out infinite;background-size: 400% 100%;} cmmod h1 { position: relative;height: auto; min-height: 26px; font-size: 24px; max-width: 100vw; white-space: break-spaces;overflow: hidden; text-overflow: ellipsis;color: snow; padding: 0px; padding-left: 3px; padding-right: 3px;margin-top: 10px; margin-bottom: 0px;margin-right: 2px; margin-left: 2px; } cmmod h3 { position: relative;height: auto; min-height: 26px; font-size: 15px; max-width: 100vw; white-space: break-spaces;overflow: hidden; text-overflow: ellipsis;color: snow; padding: 0px; padding-left: 3px; padding-right: 3px;margin-top: 0px; margin-bottom: 10px;margin-right: 2px; margin-left: 2px; } cmmod p { position: relative;height: auto; min-height: 26px; background-color: transparent;border-radius: 5px;font-size: 24px; line-height: 20px; white-space: break-spaces;overflow: hidden; text-overflow: ellipsis;color: snow; padding: 0px; padding-left: 3px; padding-right: 3px;margin: 0px; margin-right: 2px; margin-left: 2px; } cmmod p:hover { background: dodgerblue;} cmmod h2 { position: relative;height: 26px; background-color: transparent;border-radius: 5px;font-size: 20px; font-weight: 500; overflow: hidden; text-overflow: ellipsis;color: snow; padding: 0px; padding-left: 3px; padding-right: 3px;margin: 0px; margin-right: 2px; margin-left: 2px; } cmmod input { background-color: #404040;height: auto; border: none; border-radius: 5px;width: 50px; outline: none; color: snow; font-size: 20px; } cmmod div { margin-bottom: 5px;} @keyframes rainbow_animation {0%, 100% { background-position: 0 0;} 50% { background-position: 100% 0;} } </style> <titlecmmod onclick='hidemenu();' onmousemove='drag();'><h1>CivicaMente Recoveries</h1><h3>by R3Dki</h3> </titlecmmod> <div id='menuOptions'><p onclick='complete(soglia_min);'>Complete with min score</p><p onclick='complete(nmax);'>Complete with max score</p><p onclick='complete(69);'>Complete with 69(lmao) score</p><p onclick='complete(random(1, nmax+1))'>Complete with random val</p><p onclick='complete(0)'>Fail with 0% correct</p><p onclick='complete(nmax-1)'>Fail 1 point less than min</p><h2>Go to Answer: <input type='number' id='selectedQuestionMod' onchange='goto();'></input></h2></div>"; document.body.appendChild(cmMod);
