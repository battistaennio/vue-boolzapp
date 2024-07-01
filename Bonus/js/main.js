

const { createApp } = Vue;

createApp({

    data() {
        return {

            contacts: [
                {
                    name: 'Michela',
                    avatar: 'img/avatar_1.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'img/avatar_2.png',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'img/avatar_3.png',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandra B.',
                    avatar: 'img/avatar_4.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandra L.',
                    avatar: 'img/avatar_5.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudio',
                    avatar: 'img/avatar_6.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federica',
                    avatar: 'img/avatar_7.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Daniela',
                    avatar: 'img/avatar_8.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],

            activeChat: 0,
            newMessage : "",
            searchChatInput: "",
            searchArray: [],
            autoResponse: [],

        }
    },

    methods: {
        //funzione per inviare un nuovo messaggio
        sendMessage() {
            if (this.newMessage.length > 0) {
                //pusho un nuovo oggetto nella chat selezionata 
                this.contacts[this.activeChat].messages.push({message: this.newMessage, status: "sent"});
                //dopo 1 sec ricevo risposta automatica
                this.randomReply();
            }
            //svuoto il contenuto dell'input
            this.newMessage = "";
        },

        //funzione cerca chat
        searchChat() {
            //forzo la lettura dell'input in modo che sia in caratteri minuscoli
            const inputLowerCase = this.searchChatInput.toLowerCase();
            //attraverso filter seleziono solo i nomi che contengono le lettere scritte nell'input
            this.searchArray = this.contacts.filter(person => person.name.toLowerCase().includes(inputLowerCase));
        },

        //funzione visualizza chat
        setActiveChat(index) {
            //recupero il contatto filtrato
            const person = this.searchArray[index];
            //imposto tramite indexOf che activeChat sia uguale all'indice del contatto filtrato
            this.activeChat = this.contacts.indexOf(person);
        },

        //funzione elimina messaggio
        deleteMessage(indiceChat, indiceMssg){
            this.contacts[indiceChat].messages.splice(indiceMssg, 1);
        },

        //funzione che recupera una frase random
        randomReply() {
            //recupero API
            axios.get("https://flynn.boolean.careers/exercises/api/random/sentence")
            .then(risposta => {
                //dichiaro randomSentence = risposta api
                const randomSentence = risposta.data.response;
                //timer di 1 sec
                setTimeout(() => {
                    //pusho in array la frase con lo stato received
                    this.contacts[this.activeChat].messages.push({ message: randomSentence, status: "received" });
                }, 1000);
            })
            //in caso di errore
            .catch(errore => {
                console.error("Errore nel recuperare il messaggio casuale:", errore);
            });

        },

    },

    mounted() {
        this.searchArray = this.contacts;
    }

}).mount("#container")