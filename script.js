document.getElementById('inscription-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Captura os dados do formulário
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        // Envia os dados para o SheetDB
        const response = await fetch('https://sheetdb.io/api/v1/YOUR_SHEETDB_API_KEY ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });

        if (response.ok) {
            // Exibe mensagem de sucesso
            document.getElementById('success-message').style.display = 'block';
            this.reset(); // Limpa o formulário
        } else {
            alert('Erro ao enviar a inscrição. Tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar o formulário. Tente novamente.');
    }
});