const { createApp } = Vue;

createApp({
  data() {
    return {
      contador: 0,
      menuAberto: false,
      doacoes: 0,
      itens: [
        { id: 1, nome: 'Ração', prioridade: 'alta', ok: false },
        { id: 2, nome: 'Medicamentos veterinários', prioridade: 'alta', ok: false },
        { id: 3, nome: 'Cobertores e caminhas', prioridade: 'média', ok: false }
      ]
    };
  }
}).mount('#app');
