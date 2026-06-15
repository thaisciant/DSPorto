// @ts-nocheck
/**
 * PrototypeNotes — Template reutilizável para protótipos Flow
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ANTES DE USAR: leia PROTOTYPE-NOTES-RULES.md — protocolo completo
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * COMO USAR EM UM NOVO PROTÓTIPO:
 *   1. Copie este arquivo para src/components/ui/PrototypeNotes.tsx
 *   2. Sem dependências adicionais — usa apenas React
 *   3. Importe e use nas views que precisam de anotação:
 *
 *      import { PrototypeNotes } from '../components/ui/PrototypeNotes'
 *
 * USO BÁSICO — nota sempre visível em uma view:
 *   <PrototypeNotes notes={[{
 *     id: 'scope-note',
 *     description: 'Esta tela cobre apenas o fluxo de criação — edição não está implementada.'
 *   }]} />
 *
 * USO CONDICIONAL — nota visível apenas para um item específico:
 *   {bundle.id === 'b2' && (
 *     <PrototypeNotes notes={[{
 *       id: 'creator-view',
 *       description: 'Esta visão é exclusiva do criador do bundle. Demais usuários veem apenas as soluções disponíveis.'
 *     }]} />
 *   )}
 *
 * USO COM MÚLTIPLAS NOTAS — notas empilhadas, colapsam juntas para um único chip:
 *   <PrototypeNotes notes={[
 *     { id: 'role-note',  description: 'Visão exclusiva do criador do bundle.' },
 *     { id: 'scope-note', description: 'O fluxo de erro não está coberto neste protótipo.' },
 *   ]} />
 *
 * TÍTULO CUSTOMIZADO — quando "Nota do protótipo" não é suficiente:
 *   <PrototypeNotes
 *     title="Dados simulados"
 *     notes={[{ id: 'pricing', description: 'Os preços são fictícios para validação de layout.' }]}
 *   />
 *
 * COMPORTAMENTO DE COLAPSO:
 *   - Expandido (default): card(s) azul com título + descrição + botão de colapso (∧)
 *   - Colapsado: chip compacto com ícone + título + badge de contagem (se múltiplas notas)
 *   - Clicar no chip expande de volta para os cards completos
 *
 * POSICIONAMENTO — evitar sobreposição com o header:
 *   Por padrão a nota fica a 16px do topo. Se o protótipo tiver um header fixo,
 *   passe topOffset = altura_do_header + 16 para posicionar abaixo dele.
 *   Exemplo com header de 76px:
 *   <PrototypeNotes topOffset={92} notes={[{ id: 'x', description: '...' }]} />
 *
 * STACK TESTADA: React 18/19 + Vite + Tailwind CSS 3
 * DEPENDÊNCIAS: nenhuma além do React
 */

import { useState } from 'react'

// ─── Inline icons (sem dependência de react-icons) ─────────────────────────────

const InfoIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 15a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1zm0-8a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
)

const ChevronUpIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="18 15 12 9 6 15" />
  </svg>
)

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface PrototypeNote {
  /** Identificador único da nota — usado como React key */
  id: string
  /** Texto da nota. Escrever em linguagem de produto — sem jargões de código.
   *  Ver anatomia em PROTOTYPE-NOTES-RULES.md. */
  description: string
}

interface PrototypeNotesProps {
  /** Lista de notas a exibir. A condição de exibição é controlada pelo pai:
   *  passe apenas as notas que devem ser visíveis no contexto atual. */
  notes: PrototypeNote[]
  /** Título exibido em cada nota e no chip colapsado. Default: "Nota do protótipo". */
  title?: string
  /** Distância do topo da viewport em px. Default: 16.
   *  Se o protótipo tiver header fixo, use altura_do_header + 16 para não sobrepor. */
  topOffset?: number
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function PrototypeNotes({
  notes,
  title = 'Nota do protótipo',
  topOffset = 16,
}: PrototypeNotesProps) {
  const [collapsed, setCollapsed] = useState(false)

  if (!notes.length) return null

  // ── Collapsed: chip compacto ────────────────────────────────────────────────
  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className="fixed right-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#3b82f6] text-white shadow-lg hover:bg-[#2563eb] transition-colors"
        style={{ top: topOffset }}
        aria-label={`Expandir: ${title}`}
      >
        <InfoIcon size={14} />
        <span className="text-xs font-semibold leading-none">{title}</span>
        {notes.length > 1 && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/25 leading-none">
            {notes.length}
          </span>
        )}
      </button>
    )
  }

  // ── Expanded: card(s) completo(s) ───────────────────────────────────────────
  return (
    <div className="fixed right-4 z-50 flex flex-col gap-2 pointer-events-none" style={{ top: topOffset }}>
      {notes.map((note, index) => (
        <div
          key={note.id}
          className="w-[400px] flex items-start gap-3 rounded-2xl px-4 py-3 shadow-lg bg-[#3b82f6] text-white pointer-events-auto"
        >
          {/* Info icon */}
          <div className="flex-shrink-0 mt-0.5">
            <InfoIcon size={20} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-base font-bold leading-6">{title}</p>
              {/* Collapse button — apenas na primeira nota */}
              {index === 0 && (
                <button
                  type="button"
                  onClick={() => setCollapsed(true)}
                  className="flex-shrink-0 p-1 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
                  aria-label="Minimizar nota"
                >
                  <ChevronUpIcon size={14} />
                </button>
              )}
            </div>
            <p className="text-xs font-normal leading-5 opacity-90">
              {note.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
