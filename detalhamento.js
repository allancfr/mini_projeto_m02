// EXERCÍCIO 05: Funcionalidades do detalhamento de parceiros
document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('partner-detail-container');
    if (!container) return;

    const partnerId = localStorage.getItem('selectedPartnerId');
    if (!partnerId) {
        window.location.href = 'parceiros.html';
        return;
    }

    try {
        const response = await fetch(`https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros/${partnerId}`);
        if (!response.ok) throw new Error('Erro ao carregar detalhes do parceiro');
        const partner = await response.json();
        displayPartnerDetail(partner);
    } catch (error) {
        console.error('Erro:', error);
        container.innerHTML = '<p>Erro ao carregar detalhes do parceiro.</p>';
    }

    function displayPartnerDetail(partner) {
        let avatarSrc = '';
        const tipoParceiroUpper = (partner.tipoParceiro || '').toUpperCase();

        switch (tipoParceiroUpper) {
            case 'ECO': 
                avatarSrc = 'img/eco.png'; 
                break;
            case 'COO': 
                avatarSrc = 'img/coop.png'; 
                break;
            case 'PEV':
            case 'PEVS':
                avatarSrc = 'img/pev.png'; 
                break;
            default: 
                avatarSrc = 'img/default.png';
        }

        const date = partner.dataCriacao ? new Date(partner.dataCriacao).toLocaleDateString('pt-BR') : 'Data não disponível';
        

        const tipoNomes = { 'ECO': 'Ecoponto', 'COO': 'Cooperativa', 'PEV': 'Ponto de Entrega Voluntária', 'PEVS': 'Ponto de Entrega Voluntária' };
        
        const residuosAceitos = [];
        if (partner.papel) residuosAceitos.push('Papel');
        if (partner.plastico) residuosAceitos.push('Plástico');
        if (partner.vidro) residuosAceitos.push('Vidro');
        if (partner.metal) residuosAceitos.push('Metal');
        if (partner.oleoCozinha) residuosAceitos.push('Óleo de cozinha');
        if (partner.pilhaBateria) residuosAceitos.push('Pilhas e baterias');
        if (partner.eletronico) residuosAceitos.push('Eletrônicos');
        if (partner.roupa) residuosAceitos.push('Roupas');
        if (partner.outros) residuosAceitos.push('Outros');
        
        container.innerHTML = `
            <div class="partner-detail">
                <button id="back-button" class="back-button">&larr; Voltar para a listagem</button>
                <div class="partner-detail-header">
                    <img src="${avatarSrc}" alt="Avatar ${partner.tipoParceiro}" class="partner-detail-avatar-img">
                    <h2>${partner.nomeParceiro}</h2>
                    <p>Cadastrado em: ${date}</p>
                </div>
                <div class="partner-detail-info">
                    <div class="info-section">
                        <h3>Informações Gerais</h3>
                        <div class="info-item"><strong>Tipo:</strong> <span>${tipoNomes[partner.tipoParceiro.toUpperCase()] || partner.tipoParceiro}</span></div>
                        <div class="info-item"><strong>Responsável:</strong> <span>${partner.responsavelParceiro}</span></div>
                    </div>
                    <div class="info-section">
                        <h3>Contato</h3>
                        <div class="info-item"><strong>Telefone:</strong> <span>${partner.telResponsavel}</span></div>
                        <div class="info-item"><strong>E-mail:</strong> <span>${partner.emailResponsavel}</span></div>
                    </div>
                    <div class="info-section">
                        <h3>Endereço</h3>
                        <div class="info-item"><strong>Rua:</strong> <span>${partner.rua}, ${partner.numero}</span></div>
                        <div class="info-item"><strong>Bairro:</strong> <span>${partner.bairro}</span></div>
                    </div>
                    <div class="info-section" style="grid-column: 1 / -1;">
                        <h3>Tipos de Resíduos Aceitos</h3>
                        <div class="residuos-aceitos">
                            ${residuosAceitos.length > 0 ? residuosAceitos.map(r => `<span class="residuo-tag">${r}</span>`).join('') : '<span>Nenhum informado</span>'}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('back-button').addEventListener('click', () => {
            window.location.href = 'parceiros.html';
        });
    }
});