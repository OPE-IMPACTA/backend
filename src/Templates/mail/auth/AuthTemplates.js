exports.forgotPasswordHtml = (name, link) => {
    return `
        <div>
            <h3>Olá, ${ name }</h3>
            <a href=${ link } target="_blank" style="">Clique aqui para resetar a senha</a>
        </div>
    `
}

exports.confirmResetPasswordHtml = (name) => {
    return `
        <div>
            <h3>Olá, ${ name }</h3>
            <h4>A sua senha foi alterada com sucesso!</h4>
        </div>
    `
}
