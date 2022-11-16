const Tokens = {
    Validos:[
        
    ],

    Invalidos:[
        
    ]
}

/* const archivo = document.getElementById("archivo");

archivo.addEventListener("change",(e)=>{
    readFile(archivo.files)
})

function readFile(ar){
    for (let index = 0; index < ar.length; index++) {
        const reader = new FileReader();
        reader.readAsText(ar[index]);
        reader.addEventListener("load",(e)=>{
            console.log(JSON.parse(e.currentTarget.result))
        })
    }
} File reader ->>*/

/* let button = document.getElementById("button");

button.addEventListener("click", obtenerTokens, false); Button ->>*/

async function obtenerTokens() {
    let tokens = await fetch("tokens.json");
    var tokensGet = await tokens.json();
    /////////////////////////////////////////////////////
    console.groupCollapsed("Live Tokens")
    let TokenValidos = await validarTokens(tokensGet);
            for (let index = 0; index < Tokens.Validos.length; index++) {
                console.log(`%c${TokenValidos[index].token}`,`color:green;background-color:black`)
            };
    /////////////////////////////////////////////////////
    console.groupEnd()
    console.groupCollapsed("Dead Tokens")
    for (let index = 0; index < Tokens.Invalidos.length; index++) {
        console.log(`%c${Tokens.Invalidos[index].token}`,`color:red;background-color:black` )
    };
}

async function llamarFetchValidar(token){
    const llamada = await fetch('https://discordapp.com/api/v9/users/@me',{
        headers: {'Authorization': `${token}`}
    });
    const respuesta = await llamada.json();
    return [llamada,respuesta];
}

async function validarTokens(tokens) {
    for (let index = 0; index < tokens.length; index++) {
        let token = tokens[index];
            if(token) {
            const llamadaBruta = await llamarFetchValidar(token);
            const respuesta = llamadaBruta[1];
                if (llamadaBruta[0].ok) {
                    Tokens.Validos.push({
                        token: `${token}`,
                        id: respuesta.id, 
                        username: respuesta.username, 
                        avatar: respuesta.avatar, 
                        avatar_decoration: respuesta.avatar_decoration, 
                        discriminator: respuesta.discriminator, 
                        public_flags: respuesta.public_flags, 
                        flags: respuesta.flags, 
                        banner: respuesta.banner, 
                        banner_color: respuesta.banner_color, 
                        accent_color: respuesta.accent_color, 
                        bio: respuesta.bio, 
                        locale: respuesta.locale, 
                        nsfw_allowed: respuesta.nsfw_allowed, 
                        mfa_enabled: respuesta.mfa_enabled, 
                        premium_type: respuesta.premium_type, 
                        email: respuesta.email, 
                        verified: respuesta.verified, 
                        phone: respuesta.phone})
                    /* console.log(`%cToken Valido: ${token}`,`color:green;background-color:black`) */
                    let HTMLCode1 = `
                    <div class="box-result__output">
                        <div class="box-result__image" style="background-image: url('https://cdn.discordapp.com/avatars/${respuesta.id}/${respuesta.avatar}.png?size=1024');"></div>
                        <div class="box-result__text">
                            • User ID: ${respuesta.id}<br>
                            • Username: ${respuesta.username}#${respuesta.discriminator}<br>
                            • Badges: ${respuesta.flags}<br>
                            • Has Nitro: ${respuesta.premium_type}<br>
                            • E-mail: ${respuesta.email}<br>
                            • Phone: ${respuesta.phone}<br>
                        </div>
                        <img class="box-result__icon" src="assets/fileplus.png">
                    </div>`
                    document.querySelector(".box-result").innerHTML += HTMLCode1
                }
                else {
                    /* console.log(`%cToken Invalido: ${token}`,`color:red;background-color:black`) */
                    Tokens.Invalidos.push({token: `${token}`,})
                }
            }
    };
    return Tokens.Validos;
}

obtenerTokens();