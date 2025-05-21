import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-sky-900 text-white py-6 mt-auto mt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Sobre o BalancePlus</h3>
                        <p className="text-gray-300">
                            Uma solução completa para gerenciar suas finanças pessoais,
                            ajudando você a manter o controle de receitas e despesas de forma simples e eficiente.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="/" className="hover:text-green-400">Dashboard</a></li>
                            <li><a href="/receitas" className="hover:text-green-400">Receitas</a></li>
                            <li><a href="/despesas" className="hover:text-green-400">Despesas</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contato</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>Email: suporte@balanceplus.com</li>
                            <li>Telefone: (11) 9999-9999</li>
                            <li>Horário: Seg-Sex, 9h às 18h</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-sky-800 mt-8 pt-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} BalancePlus. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
