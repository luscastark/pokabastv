/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User } from "../types";
import { X, LogIn, Sparkles, Check, Send, AlertTriangle } from "lucide-react";
// @ts-ignore
import unipioLogo from "../assets/images/unipio_logo_1780768531397.png";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  // Mudamos os campos para cobrir todos os listados pelo usuário de forma obrigatória:
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("Ensino Superior Completo");
  const [cityState, setCityState] = useState("");
  const [instagram, setInstagram] = useState("");
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const avatarsList = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80"
  ];

  const educationOptions = [
    "Ensino Médio Incompleto",
    "Ensino Médio Completo",
    "Ensino Técnico",
    "Ensino Superior Incompleto",
    "Ensino Superior Completo",
    "Pós-Graduação / Especialização",
    "Mestrado",
    "Doutorado"
  ];

  // Máscara básica de CPF (000.000.000-00)
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    
    // Formata o CPF
    if (value.length > 9) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}.${value.slice(3)}`;
    }
    setCpf(value);
  };

  // Máscara básica de Telefone: (00) 00000-0000 ou (00) 0000-0000
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setPhone(value);
  };

  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val && !val.startsWith("@")) {
      val = "@" + val;
    }
    setInstagram(val);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validações básicas
    if (!fullName.trim() || fullName.trim().split(" ").length < 2) {
      setErrorMsg("Por favor, digite seu nome completo (Nome e Sobrenome).");
      return;
    }
    if (!nickname.trim()) {
      setErrorMsg("O apelido público é obrigatório.");
      return;
    }
    if (cpf.length < 14) {
      setErrorMsg("Por favor, preencha um CPF válido no formato 000.000.000-00");
      return;
    }
    if (phone.length < 14) {
      setErrorMsg("Por favor, preencha um Telefone válido.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Por favor, insira um e-mail válido.");
      return;
    }
    if (!cityState.trim()) {
      setErrorMsg("Por favor, insira sua Cidade e Estado (Ex: Aracaju / SE).");
      return;
    }
    if (!instagram.trim() || instagram === "@") {
      setErrorMsg("Por favor, insira seu perfil do Instagram (Ex: @seu_usuario).");
      return;
    }

    setIsSubmitting(true);

    // Simulação de delay de cadastro de sucesso
    setTimeout(() => {
      const newUser: User = {
        id: "usr_" + Date.now().toString(),
        name: nickname.trim(),
        fullName: fullName.trim(),
        cpf: cpf.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        education: education,
        cityState: cityState.trim(),
        instagram: instagram.trim(),
        avatarUrl: avatar,
      };
      onLogin(newUser);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleOneTapGoogleLogin = () => {
    setFullName("Chuteira de Ouro Júnior");
    setNickname("Chuteira de Ouro");
    setCpf("123.456.789-00");
    setPhone("(79) 99123-4567");
    setEmail("chuteira@unipio.edu.br");
    setEducation("Ensino Superior Completo");
    setCityState("Aracaju / SE");
    setInstagram("@chuteiradeouro");
    setAvatar(avatarsList[0]);
    // Informa o usuário
    setErrorMsg("Google One-Tap preencheu seus dados com sucesso! Revise e clique em 'Concluir Cadastro'.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-neutral-950/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white animate-scale-up backdrop-blur-xl">
        
        {/* TOPO DO MODAL - BRANDING GLASS */}
        <div className="relative bg-gradient-to-r from-blue-700/50 to-emerald-700/50 p-6 border-b border-white/10">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-xs"></div>
          <div className="relative flex justify-between items-center z-10">
            <div className="space-y-1">
              <span className="bg-yellow-400 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest inline-block mb-1">
                ONBOARDING OBRIGATÓRIO
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={unipioLogo}
                  alt="UNIPIO Pokabas TV Logo"
                  className="h-9 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <h2 className="text-lg font-sans font-black tracking-tight uppercase text-white">
                  Cadastro de Participante
                </h2>
              </div>
              <p className="text-xs text-slate-350 font-normal">
                Preencha os dados do líder para salvar seus palpites e concorrer aos prêmios.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CORPO DO MODAL */}
        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
          
          {/* GOOGLE ONE TAP INSTANT BANNER */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center space-y-3">
            <p className="text-xs text-blue-350 font-medium">
              Quer economizar tempo? Use o Google One-Tap para preencher seus dados instantaneamente:
            </p>
            <button
              type="button"
              onClick={handleOneTapGoogleLogin}
              className="px-4 py-2 mx-auto text-xs font-bold uppercase tracking-wider bg-white text-gray-900 rounded-lg hover:bg-gray-100 flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-white/5 active:scale-95"
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google Icon" 
                className="w-4 h-4"
              />
              <span>Preencher com Google One-Tap</span>
            </button>
          </div>

          {errorMsg && (
            <div className={`p-3.5 rounded-lg text-xs flex items-start gap-2 border font-medium ${
              errorMsg.includes("sucesso") 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
            }`}>
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
            
            {/* AVATAR SELECT */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Escolha seu Avatar de Líder:
              </label>
              <div className="flex gap-3 items-center justify-start flex-wrap">
                {avatarsList.map((av, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`relative rounded-full overflow-hidden w-11 h-11 border-2 transition-all cursor-pointer ${
                      avatar === av 
                        ? "border-emerald-500 scale-110 shadow-lg shadow-emerald-500/20" 
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={av} alt="Avatar option" className="w-full h-full object-cover" />
                    {avatar === av && (
                      <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-400 font-bold" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* NOME COMPLETO */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Nome Completo (Membro/Líder) <span className="text-emerald-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Silva Santos"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 focus:bg-white/[0.08] transition-colors"
                />
              </div>

              {/* APELIDO NO PAINEL */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Apelido no Ranking (Público) <span className="text-emerald-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlão_Mundial"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 focus:bg-white/[0.08] transition-colors"
                />
              </div>

              {/* CPF */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">CPF do Líder <span className="text-emerald-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCpfChange}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 focus:bg-white/[0.08] transition-colors font-mono"
                />
              </div>

              {/* TELEFONE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">WhatsApp / Telefone <span className="text-emerald-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="(79) 99999-9999"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 focus:bg-white/[0.08] transition-colors font-mono"
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Endereço de E-mail <span className="text-emerald-500">*</span></label>
                <input
                  type="email"
                  required
                  placeholder="contato@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 focus:bg-white/[0.08] transition-colors"
                />
              </div>

              {/* PROFILE INSTAGRAM */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Perfil do Instagram <span className="text-emerald-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="@usuario_instagram"
                  value={instagram}
                  onChange={handleInstagramChange}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 focus:bg-white/[0.08] transition-colors font-mono"
                />
              </div>

              {/* ESCOLARIDADE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Nível de Escolaridade <span className="text-emerald-500">*</span></label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {educationOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* CIDADE / ESTADO */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Cidade / Estado <span className="text-emerald-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aracaju / SE"
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 focus:bg-white/[0.08] transition-colors"
                />
              </div>

            </div>

            {/* ACTION ENVIAR FORMULÁRIO */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 disabled:from-zinc-700 disabled:to-zinc-800 text-black font-sans font-black uppercase text-xs tracking-wider py-3.5 rounded-xl shadow-lg hover:shadow-emerald-500/20 active:translate-y-[1px] transition-all flex items-center justify-center gap-2 cursor-pointer border-b-2 border-emerald-700 font-extrabold"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Mapeando Craque no Sistema...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Cadastrar e Começar</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* RODAPÉ DO MODAL */}
        <div className="bg-neutral-950 p-4 border-t border-white/15 text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Bolão UNIPIO Pokabas TV • Copa 2026
        </div>

      </div>
    </div>
  );
}
