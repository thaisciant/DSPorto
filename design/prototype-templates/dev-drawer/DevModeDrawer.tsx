// @ts-nocheck
/**
 * DevModeDrawer — Template reutilizável para protótipos Flow
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ANTES DE USAR: leia DEV-DRAWER-RULES.md — protocolo completo
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * COMO USAR EM UM NOVO PROTÓTIPO:
 *   1. Copie este arquivo para src/components/ui/DevModeDrawer.tsx
 *   2. npm install mermaid
 *   3. Mantenha __CONFIGURED__ = false até terminar de configurar
 *   4. Preencha SCREENS, FLOW_DIAGRAM e SPEC_SECTIONS com dados reais
 *   5. Conecte onTrigger no App pai (ver padrão abaixo e DEV-DRAWER-RULES.md)
 *   6. Valide: cada tela navega, cada estado funciona, sem ✏️ no conteúdo
 *   7. Mude __CONFIGURED__ = true
 *
 * PADRÃO onTrigger no App pai:
 *   <DevModeDrawer
 *     screens={SCREENS}
 *     sections={VIEW_SECTIONS}
 *     subtitle="Produto · View"
 *     onTrigger={(action) => {
 *       if (action.startsWith('navigate:')) setCurrentView(action.replace('navigate:', ''))
 *       if (action.startsWith('state:'))    { const [,v,s] = action.split(':'); setCurrentView(v); setViewState(s) }
 *       if (action.startsWith('trigger:'))  handleDevTrigger(action.replace('trigger:', ''))
 *     }}
 *   />
 *
 * PADRÃO SECTIONS POR VIEW (contexto relevante por tela):
 *   export const VIEW_BUNDLE_LIST_SECTIONS: SpecSection[] = [...]
 *   // Cada view importa e passa seus próprios sections
 *   // Não use um único SPEC_SECTIONS global — vira ruído
 *
 * DEPENDÊNCIAS: mermaid · react-icons/tb · @ci-t-hyperx/flow-ds
 * STACK TESTADA: React 18/19 + Vite + Tailwind CSS 3 + Radix UI
 */

import { useState, useEffect, useRef, useId, useMemo, Component } from 'react'
import {
  TbCode, TbX, TbChevronDown, TbChevronRight,
  TbPlayerPlay, TbCopy, TbCheck, TbExternalLink,
  TbRefresh, TbSearch, TbGitBranch, TbAlertTriangle,
  TbRoute, TbCircleDot,
} from 'react-icons/tb'
import mermaid from 'mermaid'
import { Badge } from '@ci-t-hyperx/flow-ds'

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

// ─── ✏️ CHAVE DE CONFIGURAÇÃO ─────────────────────────────────────────────────
// Mude para true SOMENTE quando todas as condições do checklist forem atendidas.
// Enquanto false, o setup panel fica visível no drawer listando o que falta.
const __CONFIGURED__ = false

// ─── ✏️ TELAS DO PROTÓTIPO ────────────────────────────────────────────────────
// Liste TODAS as telas navegáveis do protótipo.
// 'view' deve ser o valor exato passado ao setter de navegação do App (setCurrentView, etc.)
// states: estados demonstráveis desta tela via onTrigger
// Consulte DEV-DRAWER-RULES.md — "Padrão de navegação" para o contrato completo.

interface ScreenState {
  id: string
  label: string
  description?: string
  trigger: string        // action emitida: onTrigger('state:view:estado')
  color?: string
  closesDrawer?: boolean // fecha a drawer ao acionar (use em states com snackbar/toast)
}

interface PrototypeScreen {
  id: string
  label: string
  description: string
  view: string         // ✏️ identificador exato usado em setCurrentView()
  tags?: string[]
  states?: ScreenState[]
}

// ✏️ Substitua pelas telas REAIS do protótipo
const SCREENS: PrototypeScreen[] = [
  {
    id: 'tela-1',
    label: '✏️ Tela inicial',
    description: '✏️ O que o usuário vê ao entrar no produto',
    view: '✏️-entry',    // ✏️ identificador real no App
    tags: ['entrada'],
    states: [
      { id: 'default', label: 'Estado padrão', trigger: 'state:entry:default', color: '#16a34a' },
      { id: 'empty',   label: 'Lista vazia',   trigger: 'state:entry:empty',   color: '#9ca3af' },
      { id: 'loading', label: 'Carregando',    trigger: 'state:entry:loading', color: '#3b82f6' },
    ],
  },
  // ✏️ Adicione as demais telas
  // {
  //   id: 'tela-2',
  //   label: '✏️ Nome da tela',
  //   description: '✏️ Propósito desta tela',
  //   view: '✏️-view-name',
  //   tags: ['formulario'],
  //   states: [
  //     { id: 'error', label: 'Erro de validação', trigger: 'state:view-name:error', color: '#dc2626' },
  //   ],
  // },
]

// ─── ✏️ DIAGRAMA DE FLUXO ──────────────────────────────────────────────────────
// Substitua pelo diagrama Mermaid do fluxo REAL do protótipo.
// Deve cobrir: happy path completo + fluxos de erro principais.
// Nomes dos nós = nomes reais das views (consistência com SCREENS).
// Referência: https://mermaid.js.org/syntax/flowchart.html

const FLOW_DIAGRAM = `flowchart LR
  A(["✏️ Entrada"]) --> B["✏️ View Principal"]
  B --> C{"✏️ Decisão?"}
  C -->|"Sim"| D["✏️ View A"]
  C -->|"Não"| E(["✏️ Saída"])
  D --> E

  style A fill:#eef1f7,stroke:#232766,color:#232766
  style E fill:#f0fdf4,stroke:#16a34a,color:#14532d
`

// ─── ✏️ FLUXOS / VERSÕES (opcional) ───────────────────────────────────────────
// Use quando o protótipo tem múltiplos fluxos ou versões (v1, v2, WIP, etc.)
// Se o protótipo tem apenas um fluxo, remova ou deixe vazio.

interface FlowRoute {
  id: string
  name: string
  version: string
  description?: string
  status: 'current' | 'stable' | 'wip' | 'deprecated'
}

const FLOW_STATUS_META: Record<FlowRoute['status'], { label: string; color: string; bg: string; border: string }> = {
  current:    { label: 'Atual',      color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  stable:     { label: 'Stable',     color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
  wip:        { label: 'WIP',        color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  deprecated: { label: 'Deprecated', color: '#9ca3af', bg: '#f9fafb', border: '#e5e7eb' },
}

const FLOW_ROUTES: FlowRoute[] = [
  // ✏️ Preencha se o protótipo tem múltiplos fluxos
  // { id: 'v1', name: '✏️ Fluxo Principal', version: 'v1', description: '✏️', status: 'current' },
]

// ─── ✏️ SEÇÕES POR VIEW ───────────────────────────────────────────────────────
// REGRA: cada view exibe apenas as seções relevantes para ela.
// Use o padrão sectionsByView + currentView para contextualização automática.
//
// PADRÃO RECOMENDADO:
//   export const DASHBOARD_SECTIONS: SpecSection[] = [...]
//   export const CALCULATOR_SECTIONS: SpecSection[] = [...]
//   export const SETTINGS_SECTIONS: SpecSection[] = [...]
//
//   const SECTIONS_BY_VIEW: Record<string, SpecSection[]> = {
//     'dashboard':  DASHBOARD_SECTIONS,
//     'calculator': CALCULATOR_SECTIONS,
//     'settings':   SETTINGS_SECTIONS,
//   }
//   <DevModeDrawer currentView={currentView} sectionsByView={SECTIONS_BY_VIEW} />
//
// SEÇÕES DISPONÍVEIS (adicione apenas as relevantes para cada view):
//   states  → estados da view com triggers interativos + closesDrawer para snackbar/toast
//   fields  → campos de formulário
//   rules   → regras de negócio não óbvias pelo código
//   notes   → avisos para o dev (fundo amarelo)
//   groups  → mensagens do sistema com botão de cópia (use para textos de tooltip tb)
//
// NÃO existe seção obrigatória. Adicione apenas o que é relevante para o receptor.

interface SpecState {
  name: string
  description: string
  color: string
  trigger?: string       // action emitida via onTrigger ao clicar
  closesDrawer?: boolean // fecha a drawer ao acionar (use em states com snackbar/toast)
}

interface SpecField {
  name: string
  required: boolean
  description: string
  type?: 'multi' | 'single'
}

interface SpecMessage {
  scenario: string
  message: string
  display: 'inline-error' | 'snackbar-success'
}

interface SpecGroup {
  name: string
  messages: SpecMessage[]
}

interface SpecSection {
  id: string
  title: string
  enabled?: boolean     // padrão true — false oculta a seção completamente
  states?: SpecState[]
  fields?: SpecField[]
  rules?: string[]
  notes?: string[]
  groups?: SpecGroup[]
  // SOBRE TOOLTIPS: para documentar textos de tooltip que o dev possa copiar,
  // use um 'groups' com display: 'inline-error' (badge azul) e a mensagem do tooltip.
  // O CopyButton já aparece em cada mensagem automaticamente.
}

// ✏️ Substitua por constantes exportadas por view:
// export const DASHBOARD_SECTIONS: SpecSection[] = [...]
// export const CALCULATOR_SECTIONS: SpecSection[] = [...]
// export const SETTINGS_SECTIONS: SpecSection[] = [...]
const SPEC_SECTIONS: SpecSection[] = []

// ─── SETUP VALIDATOR ─────────────────────────────────────────────────────────

function getSetupIssues(onTrigger?: (a: string) => void): string[] {
  const issues: string[] = []

  if (FLOW_DIAGRAM.includes('✏️')) {
    issues.push('FLOW_DIAGRAM ainda usa placeholder — substitua pelo fluxo real')
  }

  const placeholderScreens = SCREENS.filter(
    (s) => s.view.includes('✏️') || s.label.includes('✏️'),
  )
  if (placeholderScreens.length > 0) {
    issues.push(
      `${placeholderScreens.length} tela(s) com placeholder em label ou view — preencha SCREENS`,
    )
  }

  if (SCREENS.length === 0) {
    issues.push('SCREENS está vazio — adicione as telas do protótipo')
  }

  if (!onTrigger) {
    issues.push('onTrigger não conectado — o App pai precisa implementar o handler de navegação')
  }

  const activeSections = SPEC_SECTIONS.filter((s) => s.enabled !== false)
  const placeholderSections = activeSections.filter(
    (s) =>
      s.title.includes('✏️') ||
      s.tooltip?.includes('✏️') ||
      s.rules?.some((r) => r.includes('✏️')) ||
      s.states?.some((st) => st.name.includes('✏️') || st.trigger?.includes('✏️')) ||
      s.fields?.some((f) => f.name.includes('✏️')) ||
      s.groups?.some((g) =>
        g.name.includes('✏️') || g.messages.some((m) => m.message.includes('✏️')),
      ),
  )
  if (placeholderSections.length > 0) {
    issues.push(
      `Seções ativas com placeholder: ${placeholderSections.map((s) => s.title.replace('✏️ ', '')).join(', ')}`,
    )
  }

  return issues
}

// ─── ERROR BOUNDARY ──────────────────────────────────────────────────────────

class DiagramErrorBoundary extends Component<
  { children: React.ReactNode },
  { crashed: boolean }
> {
  state = { crashed: false }
  static getDerivedStateFromError() {
    return { crashed: true }
  }
  render() {
    if (this.state.crashed)
      return (
        <div className="px-4 py-3 text-[12px] text-[#dc2626]">
          Erro ao renderizar diagrama.{' '}
          <button onClick={() => this.setState({ crashed: false })} className="underline">
            Tentar novamente
          </button>
        </div>
      )
    return this.props.children
  }
}

// ─── MERMAID ──────────────────────────────────────────────────────────────────

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#eef1f7',
    primaryTextColor: '#00053c',
    primaryBorderColor: '#232766',
    lineColor: '#6b7280',
    fontSize: '12px',
  },
})

function openInMermaidLive(diagram: string) {
  const state = { code: diagram, mermaid: '{"theme":"base"}', autoSync: true, rough: false }
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))))
  window.open(`https://mermaid.live/edit#base64:${encoded}`, '_blank', 'noopener')
}

let _mermaidCounter = 0

// ─── SUBCOMPONENTES ───────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="p-1 rounded hover:bg-[#e9ecef] transition-colors shrink-0"
      title="Copiar"
    >
      {copied ? (
        <TbCheck size={13} className="text-[#16a34a]" />
      ) : (
        <TbCopy size={13} className="text-[#9ca3af] hover:text-[#374151]" />
      )}
    </button>
  )
}

// Setup panel — visível quando __CONFIGURED__ = false
function SetupPanel({ issues }: { issues: string[] }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="mx-5 mb-3 rounded-xl border border-[#fde68a] bg-[#fffbeb] overflow-hidden">
      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <TbAlertTriangle size={14} className="text-[#d97706] shrink-0" />
          <span className="text-[12px] font-semibold text-[#92400e]">
            Em configuração — {issues.length} item{issues.length !== 1 ? 'ns' : ''} pendente
            {issues.length !== 1 ? 's' : ''}
          </span>
        </div>
        {collapsed ? (
          <TbChevronRight size={14} className="text-[#d97706]" />
        ) : (
          <TbChevronDown size={14} className="text-[#d97706]" />
        )}
      </button>
      {!collapsed && (
        <div className="px-4 pb-4 space-y-2 border-t border-[#fde68a]">
          <p className="text-[11px] text-[#78350f] pt-3 leading-relaxed">
            Configure as constantes marcadas com{' '}
            <span className="font-mono bg-[#fef3c7] px-1 rounded">✏️</span> e defina{' '}
            <span className="font-mono bg-[#fef3c7] px-1 rounded">__CONFIGURED__ = true</span>{' '}
            ao finalizar.
          </p>
          <ul className="space-y-1.5">
            {issues.map((issue, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-[4px] w-1 h-1 rounded-full bg-[#d97706] shrink-0" />
                <span className="text-[12px] text-[#78350f] leading-snug">{issue}</span>
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-[#92400e] border-t border-[#fde68a] pt-2 mt-2">
            Protocolo completo:{' '}
            <span className="font-mono bg-[#fef3c7] px-1 rounded">DEV-DRAWER-RULES.md</span>
          </p>
        </div>
      )}
    </div>
  )
}

// Telas — dropdown de telas + seção Estados (exibida apenas quando a tela selecionada tem estados)
function ScreensSection({
  screens,
  currentView,
  flows = [],
  activeFlowId,
  onFlowChange,
  onTrigger,
}: {
  screens: PrototypeScreen[]
  currentView?: string
  flows?: FlowRoute[]
  activeFlowId?: string
  onFlowChange?: (id: string) => void
  onTrigger?: (action: string) => void
}) {
  const initialId = currentView
    ? (screens.find((s) => s.view === currentView)?.id ?? screens[0]?.id ?? '')
    : (screens[0]?.id ?? '')

  const [selectedId, setSelectedId] = useState<string>(initialId)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!currentView) return
    const match = screens.find((s) => s.view === currentView)
    if (match) setSelectedId(match.id)
  }, [currentView, screens])

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  if (screens.length === 0) return null

  const selected = screens.find((s) => s.id === selectedId) ?? screens[0]
  const hasStates = (selected?.states?.length ?? 0) > 0

  return (
    <div className="border-b border-[#e9ecef]">
      {/* Header — Telas */}
      <div className="flex items-center px-6 py-3">
        <div className="flex items-center gap-2">
          <TbCircleDot size={14} className="text-[#9ca3af]" />
          <span className="text-[13px] font-bold text-[#00053c]">Telas</span>
        </div>
      </div>

      <div className="px-6 pt-0 pb-5">
        {/* Dropdown de telas */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#f8f9fb] border border-[#e9ecef] hover:border-[#c7d2e8] transition-colors text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <TbRoute size={13} className="text-[#9ca3af] shrink-0" />
              <span className="text-[13px] font-semibold text-[#1f2937] truncate">
                {selected?.label ?? '—'}
              </span>
              {selected?.tags?.map((t) => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#eef1f7] text-[#000050] shrink-0">
                  {t}
                </span>
              ))}
            </div>
            <TbChevronDown
              size={14}
              className={cn('text-[#9ca3af] shrink-0 transition-transform', dropdownOpen && 'rotate-180')}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-[#e9ecef] rounded-xl shadow-lg overflow-hidden">
              {screens.map((screen) => {
                const isPlaceholder = screen.view.includes('✏️') || screen.label.includes('✏️')
                const isActive = screen.id === selectedId
                return (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(screen.id)
                      setDropdownOpen(false)
                      if (!isPlaceholder && onTrigger) {
                        onTrigger(`navigate:${screen.view}`)
                      }
                    }}
                    className={cn(
                      'w-full text-left flex items-start gap-3 px-3 py-2.5 hover:bg-[#f8f9fb] transition-colors',
                      isActive && 'bg-[#f0f2f8]',
                    )}
                  >
                    <TbCircleDot
                      size={13}
                      className={cn(
                        'mt-[3px] shrink-0',
                        isPlaceholder ? 'text-[#d1d5db]' : isActive ? 'text-[#000050]' : 'text-[#9ca3af]',
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn('text-[13px] font-semibold', isActive ? 'text-[#000050]' : 'text-[#1f2937]')}>
                          {screen.label}
                        </span>
                        {screen.tags?.map((t) => (
                          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#eef1f7] text-[#000050]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-[12px] text-[#6b7280] mt-0.5 leading-snug">{screen.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Estados — seção separada, exibida apenas quando a tela selecionada tem estados definidos */}
      {hasStates && (
        <>
          <div className="border-t border-[#e9ecef]" />
          <div className="px-6 py-3 pb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[13px] font-bold text-[#00053c]">Estados</span>
            </div>
            <div className="space-y-0.5">
              {selected!.states!.map((state) => (
                <button
                  key={state.id}
                  type="button"
                  onClick={() => onTrigger?.(state.trigger)}
                  disabled={!onTrigger}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-2 py-2 -mx-2 rounded-lg text-left transition-colors',
                    onTrigger ? 'hover:bg-[#eef1f7] group' : 'opacity-40 cursor-not-allowed',
                  )}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: state.color ?? '#9ca3af' }}
                  />
                  <span className="text-[12px] font-semibold text-[#1f2937] group-hover:text-[#000050] transition-colors">
                    {state.label}
                  </span>
                  {state.description && (
                    <span className="text-[12px] text-[#6b7280]">— {state.description}</span>
                  )}
                  {onTrigger && (
                    <TbPlayerPlay
                      size={10}
                      className="ml-auto shrink-0 text-[#d1d5db] group-hover:text-[#000050] transition-colors"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function FlowDiagramSection() {
  const [open, setOpen] = useState(false)
  const [rendered, setRendered] = useState(false)
  const [hasError, setHasError] = useState(false)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const baseId = useId().replace(/:/g, '')
  const isPlaceholder = FLOW_DIAGRAM.includes('✏️')

  async function render() {
    setHasError(false)
    setRendered(false)
    if (svgContainerRef.current) svgContainerRef.current.replaceChildren()
    const uid = `mermaid-${baseId}-${++_mermaidCounter}`
    try {
      const { svg } = await mermaid.render(uid, FLOW_DIAGRAM)
      if (svgContainerRef.current) {
        const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
        svgContainerRef.current.replaceChildren(doc.documentElement.cloneNode(true))
        setRendered(true)
      }
    } catch {
      setHasError(true)
    }
  }

  useEffect(() => {
    if (open && !rendered && !hasError && !isPlaceholder) render()
  }, [open])

  return (
    <div className="border border-[#e9ecef] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#f8f9fb] hover:bg-[#f0f2f8] transition-colors text-left"
      >
        <span className="text-[13px] font-bold text-[#00053c]">Diagrama de Fluxo</span>
        {open ? (
          <TbChevronDown size={15} className="text-[#6b7280] shrink-0" />
        ) : (
          <TbChevronRight size={15} className="text-[#6b7280] shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-3 space-y-3 bg-white">
          {isPlaceholder ? (
            <div className="rounded-lg border border-dashed border-[#fde68a] bg-[#fffbeb] p-4 text-center">
              <p className="text-[12px] text-[#92400e]">
                ✏️ Substitua <span className="font-mono bg-[#fef3c7] px-1 rounded">FLOW_DIAGRAM</span> pelo
                diagrama Mermaid do fluxo real do protótipo
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#9ca3af]">Clique no diagrama para abrir no editor</p>
                <button
                  type="button"
                  onClick={render}
                  className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold text-[#6b7280] hover:bg-[#f0f2f8] hover:text-[#374151] transition-colors"
                >
                  <TbRefresh size={12} /> Refresh
                </button>
              </div>
              <button
                type="button"
                onClick={() => openInMermaidLive(FLOW_DIAGRAM)}
                disabled={hasError}
                className="w-full border border-[#e9ecef] rounded-lg overflow-hidden bg-[#fafafa] min-h-[120px] flex items-center justify-center p-3 cursor-pointer hover:border-[#c7d2e8] transition-colors disabled:cursor-default"
                title="Abrir no mermaid.live"
              >
                {hasError ? (
                  <div className="text-center space-y-1">
                    <p className="text-[12px] text-[#dc2626]">Erro ao renderizar</p>
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        render()
                      }}
                      className="text-[11px] text-[#000050] underline underline-offset-2"
                    >
                      Tentar novamente
                    </span>
                  </div>
                ) : (
                  <div
                    ref={svgContainerRef}
                    className="w-full pointer-events-none [&_svg]:max-w-full [&_svg]:h-auto"
                  >
                    {!rendered && (
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-3 h-3 border-2 border-[#000050] border-t-transparent rounded-full animate-spin" />
                        <p className="text-[12px] text-[#9ca3af]">Renderizando…</p>
                      </div>
                    )}
                  </div>
                )}
              </button>
              {rendered && (
                <p className="text-[10px] text-[#9ca3af] text-center flex items-center justify-center gap-1">
                  <TbExternalLink size={10} /> Abre no editor Mermaid
                </p>
              )}
            </>
          )}
          <details className="group">
            <summary className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-[0.5px] cursor-pointer select-none list-none flex items-center gap-1 hover:text-[#374151] transition-colors">
              <TbChevronRight size={12} className="transition-transform group-open:rotate-90" /> Fonte
              Mermaid
            </summary>
            <div className="mt-2 relative">
              <pre className="text-[10.5px] text-[#374151] bg-[#f8f9fb] border border-[#e9ecef] rounded-lg p-3 overflow-x-auto leading-relaxed whitespace-pre font-mono">
                {FLOW_DIAGRAM.trim()}
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text={FLOW_DIAGRAM.trim()} />
              </div>
            </div>
          </details>
        </div>
      )}
    </div>
  )
}

function FlowSelector({
  flows,
  activeId,
  onChange,
}: {
  flows: FlowRoute[]
  activeId: string
  onChange: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = flows.find((f) => f.id === activeId) ?? flows[0]
  const meta = FLOW_STATUS_META[active.status]

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  return (
    <div ref={ref} className="relative px-4 py-2.5 border-b border-[#e9ecef] bg-[#f8f9fb] shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white border border-[#e9ecef] hover:border-[#c7d2e8] transition-colors text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <TbGitBranch size={13} className="text-[#9ca3af] shrink-0" />
          <span className="text-[13px] font-semibold text-[#1f2937] truncate">{active.name}</span>
          <span className="text-[11px] font-mono text-[#9ca3af] shrink-0">{active.version}</span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
            style={{ color: meta.color, backgroundColor: meta.bg, border: `1px solid ${meta.border}` }}
          >
            {meta.label}
          </span>
        </div>
        <TbChevronDown
          size={14}
          className={cn('text-[#9ca3af] shrink-0 transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="absolute left-4 right-4 top-full mt-1 z-50 bg-white border border-[#e9ecef] rounded-xl shadow-lg overflow-hidden">
          <div className="px-3 py-2 border-b border-[#f3f4f6]">
            <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">
              Fluxos deste protótipo
            </p>
          </div>
          {flows.map((flow) => {
            const m = FLOW_STATUS_META[flow.status]
            const isActive = flow.id === activeId
            return (
              <button
                key={flow.id}
                type="button"
                onClick={() => {
                  onChange(flow.id)
                  setOpen(false)
                }}
                className={cn(
                  'w-full text-left flex items-start gap-3 px-3 py-2.5 hover:bg-[#f8f9fb] transition-colors',
                  isActive && 'bg-[#f0f2f8]',
                )}
              >
                <span
                  className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: m.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'text-[13px] font-semibold',
                        isActive ? 'text-[#000050]' : 'text-[#1f2937]',
                      )}
                    >
                      {flow.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#9ca3af]">{flow.version}</span>
                    {isActive && (
                      <span className="text-[10px] font-semibold text-[#000050] bg-[#eef1f7] px-1.5 py-0.5 rounded-full">
                        Ativo
                      </span>
                    )}
                  </div>
                  {flow.description && (
                    <p className="text-[12px] text-[#6b7280] leading-snug mt-0.5">
                      {flow.description}
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SearchBar({ query, onChange }: { query: string; onChange: (v: string) => void }) {
  return (
    <div className="px-6 py-3 border-b border-[#e9ecef] shrink-0">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f8f9fb] border border-[#e9ecef] focus-within:border-[#000050] focus-within:bg-white transition-colors">
        <TbSearch size={14} className="text-[#9ca3af] shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar telas, estados, specs…"
          className="flex-1 bg-transparent text-[13px] text-[#1f2937] placeholder:text-[#c4c9d4] outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[#9ca3af] hover:text-[#374151] transition-colors"
          >
            <TbX size={13} />
          </button>
        )}
      </div>
    </div>
  )
}

function Section({
  section,
  onTrigger,
  onClose,
}: {
  section: SpecSection
  onTrigger?: (action: string) => void
  onClose?: () => void
}) {
  const [open, setOpen] = useState(true)

  const hasContent =
    (section.states && section.states.length > 0) ||
    (section.fields && section.fields.length > 0) ||
    (section.rules && section.rules.length > 0) ||
    (section.notes && section.notes.length > 0) ||
    (section.groups &&
      section.groups.some((g) => g.messages && g.messages.length > 0))

  if (!hasContent) return null

  return (
    <div className="border-b border-[#e9ecef] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-3 hover:bg-[#f8f9fb] transition-colors text-left"
      >
        <span className="text-[13px] font-bold text-[#00053c]">{section.title}</span>
        {open ? (
          <TbChevronDown size={15} className="text-[#6b7280] shrink-0" />
        ) : (
          <TbChevronRight size={15} className="text-[#6b7280] shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 space-y-4">
          {section.states && section.states.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-[0.5px] mb-2">
                States
              </p>
              <div className="space-y-1">
                {section.states.map((s) =>
                  s.trigger && onTrigger ? (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => { onTrigger(s.trigger!); if (s.closesDrawer) onClose?.() }}
                      className="w-full text-left flex items-center gap-2 px-2 py-1.5 -mx-2 rounded-lg hover:bg-[#f0f2f8] transition-colors group"
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[13px] font-semibold text-[#1f2937] group-hover:text-[#000050] transition-colors">
                          {s.name}
                        </span>
                        <span className="text-[13px] text-[#6b7280]"> — {s.description}</span>
                      </div>
                      <TbPlayerPlay
                        size={11}
                        className="shrink-0 text-[#d1d5db] group-hover:text-[#000050] transition-colors"
                      />
                    </button>
                  ) : (
                    <div key={s.name} className="flex items-start gap-2 px-2 py-1.5">
                      <span
                        className="mt-[5px] w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <div>
                        <span className="text-[12px] font-semibold text-[#1f2937]">{s.name}</span>
                        <span className="text-[13px] text-[#6b7280]"> — {s.description}</span>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
          {section.fields && section.fields.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-[0.5px] mb-2">
                Fields
              </p>
              <div className="space-y-2">
                {section.fields.map((f) => (
                  <div key={f.name} className="flex items-start gap-2">
                    <div className="mt-0.5 flex items-center gap-1 w-[130px] shrink-0">
                      <span className="text-[12px] font-semibold text-[#1f2937]">{f.name}</span>
                      {f.required ? (
                        <span className="text-[10px] font-bold text-[#ef4444]">*</span>
                      ) : (
                        <span className="text-[10px] text-[#9ca3af]">opt</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-[#6b7280] leading-snug">{f.description}</p>
                      {f.type && (
                        <Badge
                          className="mt-0.5"
                          variant={f.type === 'multi' ? 'default' : 'inactive'}
                        >
                          {f.type === 'multi' ? 'multi-select' : 'single select'}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {section.rules && section.rules.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-[0.5px] mb-2">
                Rules
              </p>
              <ul className="space-y-1.5">
                {section.rules.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-[6px] w-1 h-1 rounded-full bg-[#000050] shrink-0" />
                    <p className="text-[13px] text-[#374151] leading-relaxed">{r}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {section.notes && section.notes.length > 0 && (
            <div className="bg-[#fffbeb] border border-[#fde68a] rounded-lg px-3 py-2.5">
              <p className="text-[11px] font-semibold text-[#92400e] uppercase tracking-[0.4px] mb-1.5">
                Dev note
              </p>
              <ul className="space-y-1">
                {section.notes.map((n, i) => (
                  <li key={i} className="text-[13px] text-[#78350f] leading-relaxed">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {section.groups && section.groups.length > 0 && (
            <div className="space-y-4">
              {section.groups.map((group) => (
                <div key={group.name}>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-[0.5px]">
                      {group.name}
                    </p>
                    <div className="flex-1 h-px bg-[#e9ecef]" />
                  </div>
                  <div className="space-y-2">
                    {group.messages.map((msg, i) => (
                      <div
                        key={i}
                        className="border border-[#e9ecef] rounded-lg px-3 py-2.5 bg-white"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <p className="text-[11px] text-[#9ca3af] leading-snug">{msg.scenario}</p>
                          <Badge
                            className="shrink-0"
                            variant={msg.display === 'inline-error' ? 'error' : 'active'}
                          >
                            {msg.display === 'inline-error' ? 'inline error' : 'snackbar'}
                          </Badge>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[13px] text-[#1f2937] leading-relaxed italic">
                            "{msg.message}"
                          </p>
                          <CopyButton text={msg.message} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function sectionMatchesQuery(section: SpecSection, q: string): boolean {
  const lower = q.toLowerCase()
  if (section.title.toLowerCase().includes(lower)) return true
  if (section.tooltip?.toLowerCase().includes(lower)) return true
  if (section.rules?.some((r) => r.toLowerCase().includes(lower))) return true
  if (section.notes?.some((n) => n.toLowerCase().includes(lower))) return true
  if (
    section.states?.some(
      (s) =>
        s.name.toLowerCase().includes(lower) || s.description.toLowerCase().includes(lower),
    )
  )
    return true
  if (
    section.fields?.some(
      (f) =>
        f.name.toLowerCase().includes(lower) || f.description.toLowerCase().includes(lower),
    )
  )
    return true
  if (
    section.groups?.some(
      (g) =>
        g.name.toLowerCase().includes(lower) ||
        g.messages.some(
          (m) =>
            m.message.toLowerCase().includes(lower) ||
            m.scenario.toLowerCase().includes(lower),
        ),
    )
  )
    return true
  return false
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

interface DevModeDrawerProps {
  /** Callback para ações do drawer. Prefixos: 'navigate:view', 'state:view:estado', 'trigger:id' */
  onTrigger?: (action: string) => void
  /** Label do header. Ex: 'Produto · View' */
  subtitle?: string
  /** View ativa no protótipo. Usada com sectionsByView para contextualização automática. */
  currentView?: string
  /**
   * Seções por view — padrão recomendado para protótipos multi-tela.
   * A drawer exibe apenas as seções da view ativa.
   *   const SECTIONS_BY_VIEW = { 'dashboard': [...], 'settings': [...] }
   *   <DevModeDrawer currentView={currentView} sectionsByView={SECTIONS_BY_VIEW} />
   */
  sectionsByView?: Record<string, SpecSection[]>
  /** Seções fixas (fallback para protótipos com uma única view ou via prop manual). */
  sections?: SpecSection[]
  /** Telas navegáveis do protótipo. */
  screens?: PrototypeScreen[]
  /** Fluxos/versões para o seletor. Omita se há apenas um fluxo. */
  flows?: FlowRoute[]
  /** Posição do botão Dev. Default: 'right'. */
  buttonPosition?: 'left' | 'center' | 'right'
}

export function DevModeDrawer({
  onTrigger,
  subtitle = '✏️ Produto · Protótipo',
  currentView,
  sectionsByView,
  screens = SCREENS,
  sections = SPEC_SECTIONS,
  flows = FLOW_ROUTES,
  buttonPosition = 'right',
}: DevModeDrawerProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeFlowId, setActiveFlowId] = useState(flows[0]?.id ?? '')

  const setupIssues = !__CONFIGURED__ ? getSetupIssues(onTrigger) : []

  // Resolve seções: sectionsByView[currentView] tem prioridade sobre sections
  const resolvedSections = sectionsByView && currentView
    ? (sectionsByView[currentView] ?? [])
    : sections

  const activeSections = resolvedSections.filter((s) => s.enabled !== false)

  const btnPositionClass =
    buttonPosition === 'left' ? 'left-6' :
    buttonPosition === 'center' ? 'left-1/2 -translate-x-1/2' :
    'right-6'

  const filteredSections = useMemo(() => {
    if (!query.trim()) return activeSections
    return activeSections.filter((s) => sectionMatchesQuery(s, query.trim()))
  }, [query, activeSections, currentView])

  const filteredScreens = useMemo(() => {
    if (!query.trim()) return screens
    const q = query.toLowerCase()
    return screens.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags?.some((t) => t.toLowerCase().includes(q)),
    )
  }, [query, screens])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'fixed bottom-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all',
          btnPositionClass,
          open ? 'bg-[#1f2937] text-white' : 'bg-[#000050] text-white hover:bg-[#000050]/85',
        )}
        title="Dev Specs"
      >
        <TbCode size={16} />
        <span className="text-[13px] font-semibold">Dev</span>
        {!__CONFIGURED__ && (
          <span className="bg-[#fde68a] text-[#92400e] rounded-full text-[9px] px-1.5 py-0.5 font-bold leading-none">
            setup
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/10" onClick={() => setOpen(false)} />
      )}

      <div
        className={cn(
          'fixed top-0 right-0 h-full w-[500px] z-50 bg-white border-l border-[#e5e7eb] shadow-[-4px_0_24px_rgba(0,0,0,0.08)] flex flex-col transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e9ecef] shrink-0">
          <div>
            <p className="text-[15px] font-bold text-[#00053c]">Dev Specs</p>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className="text-[13px] text-[#9ca3af]">{subtitle}</span>
              <span className="text-[#d1d5db] text-[12px] select-none">|</span>
              <button
                type="button"
                onClick={() => openInMermaidLive(FLOW_DIAGRAM)}
                className="flex items-center gap-1 text-[12px] text-[#000050] font-semibold hover:underline underline-offset-2 transition-colors"
              >
                Flow Diagram
                <TbExternalLink size={10} />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#374151] hover:bg-[#f3f4f6] transition-colors"
            aria-label="Fechar"
          >
            <TbX size={18} />
          </button>
        </div>

        <SearchBar query={query} onChange={setQuery} />

        <div className="flex-1 overflow-y-auto py-4 space-y-0">
          {/* Setup panel */}
          {setupIssues.length > 0 && <SetupPanel issues={setupIssues} />}

          {/* Telas & Estados */}
          {!query && <ScreensSection screens={screens} currentView={currentView} flows={flows} activeFlowId={activeFlowId} onFlowChange={setActiveFlowId} onTrigger={onTrigger} />}
          {query && filteredScreens.length > 0 && (
            <ScreensSection screens={filteredScreens} currentView={currentView} flows={flows} activeFlowId={activeFlowId} onFlowChange={setActiveFlowId} onTrigger={onTrigger} />
          )}


          {/* Seções adicionais */}
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <Section key={section.id} section={section} onTrigger={onTrigger} onClose={() => setOpen(false)} />
            ))
          ) : query ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
              <TbSearch size={20} className="text-[#d1d5db]" />
              <p className="text-[13px] text-[#9ca3af]">Nenhum resultado encontrado</p>
              <p className="text-[11px] text-[#c4c9d4]">"{query}"</p>
            </div>
          ) : null}

          <div className="text-[11px] text-[#9ca3af] text-center pb-2">
            Flow Platform · DevModeDrawer ·{' '}
            <span className={__CONFIGURED__ ? 'text-[#16a34a]' : 'text-[#d97706]'}>
              {__CONFIGURED__ ? 'Configurado ✓' : 'Em configuração ✏️'}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default DevModeDrawer
