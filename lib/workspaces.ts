import * as React from "react"
import {
  CheckCircle2Icon,
  UserPlusIcon,
  FileTextIcon,
  CalendarIcon,
  PhoneIcon,
  PenLineIcon,
  BuildingIcon,
  ClipboardCheckIcon,
  GraduationCapIcon,
  MapPinIcon,
  RefreshCwIcon,
  WrenchIcon,
  ShieldCheckIcon,
  PackageIcon,
  StarIcon,
  UserIcon,
  UserCheckIcon,
  TrendingUpIcon,
  BookOpenIcon,
  UserMinusIcon,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

export type WorkspaceId = "motor-traccion" | "distribuidores" | "postventa" | "rrhh"

export type ActivityTypeConfig = {
  label: string
  kpiLabel: string
  icon: React.ElementType
  color: string
  dot: string
}

export type Responsable = {
  id: string
  nombre: string
  initials: string
}

export type ActivityEstado = "pendiente" | "en_proceso" | "completado" | "archivado"

export type Activity = {
  id: string
  tipo: string
  estado: ActivityEstado
  titulo: string
  detalle: string
  responsableId: string
  timestamp: Date
}

export type WorkspaceActivityData = {
  activityTypes: Record<string, ActivityTypeConfig>
  activityTypesOrder: string[]
  responsables: Responsable[]
  activities: Activity[]
}

export type Workspace = {
  id: WorkspaceId
  name: string
  initials: string
  description: string
}

// ─── Shared estado config ─────────────────────────────────────────────────────

export const estadoConfig: Record<ActivityEstado, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pendiente:   { label: "Pendiente",  variant: "outline"     },
  en_proceso:  { label: "En proceso", variant: "secondary"   },
  completado:  { label: "Completado", variant: "default"     },
  archivado:   { label: "Archivado",  variant: "destructive" },
}

export const estadosOrden: ActivityEstado[] = ["pendiente", "en_proceso", "completado", "archivado"]

// ─── Helper ───────────────────────────────────────────────────────────────────

function d(daysAgo: number, h: number, m: number) {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysAgo, h, m)
}

// ─── Workspaces list ──────────────────────────────────────────────────────────

export const workspaces: Workspace[] = [
  { id: "motor-traccion", name: "Motor de Tracción", initials: "MT", description: "Ventas y CRM automotriz" },
  { id: "distribuidores", name: "Distribuidores",    initials: "DI", description: "Red de distribuidores"  },
  { id: "postventa",      name: "Postventa",          initials: "PV", description: "Servicio y garantías"   },
  { id: "rrhh",           name: "RRHH",               initials: "RH", description: "Recursos humanos"       },
]

// ─── Activity data per workspace ─────────────────────────────────────────────

export const workspaceActivityData: Record<WorkspaceId, WorkspaceActivityData> = {

  // ── Motor de Tracción ───────────────────────────────────────────────────────
  "motor-traccion": {
    activityTypes: {
      venta:       { label: "Venta",       kpiLabel: "Ventas",       icon: CheckCircle2Icon, color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
      lead:        { label: "Lead",        kpiLabel: "Leads",        icon: UserPlusIcon,     color: "text-blue-600 dark:text-blue-400",       dot: "bg-blue-500"    },
      cotizacion:  { label: "Cotización",  kpiLabel: "Cotizaciones", icon: FileTextIcon,     color: "text-violet-600 dark:text-violet-400",   dot: "bg-violet-500"  },
      demo:        { label: "Demo",        kpiLabel: "Demos",        icon: CalendarIcon,     color: "text-orange-600 dark:text-orange-400",   dot: "bg-orange-500"  },
      seguimiento: { label: "Seguimiento", kpiLabel: "Seguimientos", icon: PhoneIcon,        color: "text-yellow-600 dark:text-yellow-400",   dot: "bg-yellow-500"  },
      contrato:    { label: "Contrato",    kpiLabel: "Contratos",    icon: PenLineIcon,      color: "text-teal-600 dark:text-teal-400",       dot: "bg-teal-500"    },
    },
    activityTypesOrder: ["venta", "lead", "cotizacion", "demo", "seguimiento", "contrato"],
    responsables: [
      { id: "ana",     nombre: "Ana García",   initials: "AG" },
      { id: "luis",    nombre: "Luis Torres",  initials: "LT" },
      { id: "maria",   nombre: "María López",  initials: "ML" },
      { id: "carlos",  nombre: "Carlos Ruiz",  initials: "CR" },
      { id: "sofia",   nombre: "Sofía Méndez", initials: "SM" },
      { id: "roberto", nombre: "Roberto Vega", initials: "RV" },
    ],
    activities: [
      { id: "a1",  tipo: "venta",       estado: "completado",  titulo: "Venta completada — Nissan Kicks 2026",       detalle: "Folio VNT-1048 · $285,000",                         responsableId: "ana",     timestamp: d(0, 16, 42) },
      { id: "a2",  tipo: "lead",        estado: "en_proceso",  titulo: "Nuevo lead captado — Pedro Hernández",        detalle: "Interesado en Toyota Corolla Hybrid",               responsableId: "luis",    timestamp: d(0, 15, 18) },
      { id: "a3",  tipo: "cotizacion",  estado: "pendiente",   titulo: "Cotización enviada — Honda CR-V",             detalle: "Cliente: Laura Sánchez · $498,000",                 responsableId: "maria",   timestamp: d(0, 14,  5) },
      { id: "a4",  tipo: "seguimiento", estado: "en_proceso",  titulo: "Seguimiento realizado — VW Tiguan",           detalle: "3er contacto · cliente evalúa financiamiento",      responsableId: "carlos",  timestamp: d(0, 11, 30) },
      { id: "a5",  tipo: "demo",        estado: "pendiente",   titulo: "Demo agendada — Mazda CX-5",                  detalle: "Mañana 10:00 am · Agencia Querétaro",               responsableId: "sofia",   timestamp: d(0, 10,  0) },
      { id: "a6",  tipo: "contrato",    estado: "completado",  titulo: "Contrato firmado — Kia Sportage 2026",        detalle: "Folio CTR-0312 · Entrega en 5 días",                responsableId: "roberto", timestamp: d(0,  9, 15) },
      { id: "a7",  tipo: "venta",       estado: "completado",  titulo: "Venta completada — Toyota Camry Hybrid",      detalle: "Folio VNT-1047 · $389,000",                         responsableId: "luis",    timestamp: d(1, 17, 50) },
      { id: "a8",  tipo: "lead",        estado: "pendiente",   titulo: "Nuevo lead — Empresa Logística MX",           detalle: "Flota de 8 unidades · Toyota Hilux",                responsableId: "sofia",   timestamp: d(1, 16, 20) },
      { id: "a9",  tipo: "cotizacion",  estado: "en_proceso",  titulo: "Cotización enviada — Nissan NV350 Urvan",     detalle: "Cliente: Transporte Rápido SA · $1.2 M",            responsableId: "ana",     timestamp: d(1, 14, 35) },
      { id: "a10", tipo: "seguimiento", estado: "completado",  titulo: "Seguimiento realizado — Mazda 3",             detalle: "Cliente retomó contacto tras 2 semanas",            responsableId: "maria",   timestamp: d(1, 12,  0) },
      { id: "a11", tipo: "demo",        estado: "completado",  titulo: "Demo realizada — Honda Pilot",                detalle: "Cliente muy interesado · próximo paso: cotización", responsableId: "carlos",  timestamp: d(1, 10, 45) },
      { id: "a12", tipo: "contrato",    estado: "completado",  titulo: "Contrato firmado — VW Vento 2026",            detalle: "Folio CTR-0311 · Plan financiamiento 36 meses",     responsableId: "roberto", timestamp: d(1,  9,  0) },
      { id: "a13", tipo: "venta",       estado: "completado",  titulo: "Venta completada — Kia Sorento",              detalle: "Folio VNT-1046 · $520,000",                         responsableId: "carlos",  timestamp: d(2, 18, 15) },
      { id: "a14", tipo: "lead",        estado: "en_proceso",  titulo: "Nuevo lead captado — Diana Flores",           detalle: "Referida por cliente anterior · Nissan Frontier",   responsableId: "roberto", timestamp: d(2, 16,  0) },
      { id: "a15", tipo: "cotizacion",  estado: "pendiente",   titulo: "Cotización actualizada — Toyota RAV4",        detalle: "Segunda versión · agregó equipamiento opcional",    responsableId: "luis",    timestamp: d(2, 13, 45) },
      { id: "a16", tipo: "seguimiento", estado: "archivado",   titulo: "Seguimiento — Honda HRV",                     detalle: "Llamada 12 min · cliente en proceso de decisión",   responsableId: "sofia",   timestamp: d(2, 11, 20) },
      { id: "a17", tipo: "venta",       estado: "completado",  titulo: "Venta completada — Mazda CX-30",              detalle: "Folio VNT-1045 · $395,000",                         responsableId: "maria",   timestamp: d(3, 17,  0) },
      { id: "a18", tipo: "demo",        estado: "pendiente",   titulo: "Demo agendada — Nissan Pathfinder",           detalle: "Jueves 4pm · Agencia CDMX Sur",                     responsableId: "ana",     timestamp: d(3, 15, 30) },
      { id: "a19", tipo: "contrato",    estado: "completado",  titulo: "Contrato firmado — Toyota Corolla 2026",      detalle: "Folio CTR-0310 · Pago contado",                     responsableId: "luis",    timestamp: d(4, 10,  0) },
      { id: "a20", tipo: "lead",        estado: "pendiente",   titulo: "Nuevo lead captado — Marcos Ortega",          detalle: "Interesado en VW Golf · vía formulario web",        responsableId: "carlos",  timestamp: d(5, 14,  0) },
      { id: "a21", tipo: "seguimiento", estado: "archivado",   titulo: "Seguimiento — Kia EV6",                       detalle: "Demo pendiente · cliente evalúa eléctricos",        responsableId: "maria",   timestamp: d(5, 11,  0) },
      { id: "a22", tipo: "venta",       estado: "completado",  titulo: "Venta completada — Honda Civic",              detalle: "Folio VNT-1044 · $312,000",                         responsableId: "roberto", timestamp: d(6, 16, 30) },
    ],
  },

  // ── Distribuidores ──────────────────────────────────────────────────────────
  "distribuidores": {
    activityTypes: {
      registro:       { label: "Registro",    kpiLabel: "Registros",    icon: BuildingIcon,       color: "text-blue-600 dark:text-blue-400",     dot: "bg-blue-500"    },
      auditoria:      { label: "Auditoría",   kpiLabel: "Auditorías",   icon: ClipboardCheckIcon, color: "text-violet-600 dark:text-violet-400", dot: "bg-violet-500"  },
      capacitacion:   { label: "Capacitación",kpiLabel: "Capacitaciones",icon: GraduationCapIcon, color: "text-orange-600 dark:text-orange-400", dot: "bg-orange-500"  },
      visita_campo:   { label: "Visita campo", kpiLabel: "Visitas",     icon: MapPinIcon,         color: "text-emerald-600 dark:text-emerald-400",dot: "bg-emerald-500" },
      renovacion:     { label: "Renovación",  kpiLabel: "Renovaciones", icon: RefreshCwIcon,      color: "text-teal-600 dark:text-teal-400",     dot: "bg-teal-500"    },
    },
    activityTypesOrder: ["registro", "auditoria", "capacitacion", "visita_campo", "renovacion"],
    responsables: [
      { id: "jorge",   nombre: "Jorge Mendoza", initials: "JM" },
      { id: "claudia", nombre: "Claudia Reyes", initials: "CR" },
      { id: "hernan",  nombre: "Hernán Castro", initials: "HC" },
      { id: "valeria", nombre: "Valeria Ortiz", initials: "VO" },
    ],
    activities: [
      { id: "d1", tipo: "registro",     estado: "completado",  titulo: "Nuevo distribuidor registrado — AutoGrupo Norte",      detalle: "Monterrey · Contrato inicial firmado",               responsableId: "jorge",   timestamp: d(0, 15, 30) },
      { id: "d2", tipo: "auditoria",    estado: "en_proceso",  titulo: "Auditoría iniciada — Distribuidora del Bajío",         detalle: "Revisión trimestral · 3 puntos de mejora detectados", responsableId: "claudia", timestamp: d(0, 13, 45) },
      { id: "d3", tipo: "capacitacion", estado: "pendiente",   titulo: "Capacitación agendada — Grupo Sureste",               detalle: "Módulo ventas digitales · 15 participantes esperados", responsableId: "hernan",  timestamp: d(0, 11,  0) },
      { id: "d4", tipo: "visita_campo", estado: "completado",  titulo: "Visita campo — AutoPremium Guadalajara",               detalle: "Instalaciones en orden · inventario verificado",      responsableId: "valeria", timestamp: d(1, 16, 20) },
      { id: "d5", tipo: "renovacion",   estado: "pendiente",   titulo: "Renovación de contrato — Distribuidora Pacífico",      detalle: "Vence en 15 días · términos en negociación",          responsableId: "jorge",   timestamp: d(1, 14,  0) },
      { id: "d6", tipo: "auditoria",    estado: "completado",  titulo: "Auditoría completada — Grupo Automotriz Centro",       detalle: "Resultado: Aprobado · sin observaciones críticas",    responsableId: "claudia", timestamp: d(2, 17, 10) },
      { id: "d7", tipo: "visita_campo", estado: "en_proceso",  titulo: "Visita campo — MegaAutos Puebla",                     detalle: "Seguimiento a plan de mejora · segunda visita",        responsableId: "hernan",  timestamp: d(2, 10, 30) },
      { id: "d8", tipo: "capacitacion", estado: "completado",  titulo: "Capacitación completada — Red Noreste",               detalle: "CRM avanzado · 22 vendedores certificados",           responsableId: "valeria", timestamp: d(3, 15,  0) },
    ],
  },

  // ── Postventa ───────────────────────────────────────────────────────────────
  "postventa": {
    activityTypes: {
      cita:       { label: "Cita",       kpiLabel: "Citas",      icon: CalendarIcon,    color: "text-blue-600 dark:text-blue-400",     dot: "bg-blue-500"    },
      reparacion: { label: "Reparación", kpiLabel: "Reparaciones",icon: WrenchIcon,     color: "text-orange-600 dark:text-orange-400", dot: "bg-orange-500"  },
      garantia:   { label: "Garantía",   kpiLabel: "Garantías",  icon: ShieldCheckIcon, color: "text-emerald-600 dark:text-emerald-400",dot: "bg-emerald-500" },
      entrega:    { label: "Entrega",    kpiLabel: "Entregas",   icon: PackageIcon,     color: "text-violet-600 dark:text-violet-400", dot: "bg-violet-500"  },
      encuesta:   { label: "Encuesta",   kpiLabel: "Encuestas",  icon: StarIcon,        color: "text-yellow-600 dark:text-yellow-400", dot: "bg-yellow-500"  },
    },
    activityTypesOrder: ["cita", "reparacion", "garantia", "entrega", "encuesta"],
    responsables: [
      { id: "pablo",   nombre: "Pablo Jiménez",  initials: "PJ" },
      { id: "sandra",  nombre: "Sandra Morales", initials: "SM" },
      { id: "diego",   nombre: "Diego Fuentes",  initials: "DF" },
      { id: "natalia", nombre: "Natalia Cruz",   initials: "NC" },
    ],
    activities: [
      { id: "p1", tipo: "cita",       estado: "completado",  titulo: "Cita de servicio — Nissan Sentra 2024",    detalle: "Mantenimiento 10,000 km · cliente puntual",              responsableId: "pablo",   timestamp: d(0, 16,  0) },
      { id: "p2", tipo: "reparacion", estado: "en_proceso",  titulo: "Reparación en curso — Toyota RAV4 2023",  detalle: "Sistema de frenos · tiempo estimado 3 hrs",              responsableId: "sandra",  timestamp: d(0, 14, 30) },
      { id: "p3", tipo: "garantia",   estado: "pendiente",   titulo: "Solicitud de garantía — Honda CR-V 2025", detalle: "Falla en transmisión · dentro de cobertura",             responsableId: "diego",   timestamp: d(0, 11, 15) },
      { id: "p4", tipo: "entrega",    estado: "completado",  titulo: "Entrega realizada — Mazda CX-5 2024",     detalle: "Revisión post-reparación aprobada · cliente satisfecho", responsableId: "natalia", timestamp: d(1, 17, 45) },
      { id: "p5", tipo: "encuesta",   estado: "completado",  titulo: "Encuesta completada — Kia Sportage",      detalle: "NPS: 9/10 · cliente muy satisfecho con atención",        responsableId: "pablo",   timestamp: d(1, 15,  0) },
      { id: "p6", tipo: "cita",       estado: "pendiente",   titulo: "Cita agendada — VW Tiguan 2025",          detalle: "Viernes 9am · cambio de aceite y revisión general",      responsableId: "sandra",  timestamp: d(2, 13, 20) },
      { id: "p7", tipo: "reparacion", estado: "completado",  titulo: "Reparación completada — Ford Expedition", detalle: "Diagnóstico electrónico · pieza reemplazada",             responsableId: "diego",   timestamp: d(2,  9, 40) },
      { id: "p8", tipo: "garantia",   estado: "en_proceso",  titulo: "Garantía en evaluación — Nissan X-Trail", detalle: "Ruido en suspensión delantera · evaluación técnica",     responsableId: "natalia", timestamp: d(3, 16, 10) },
    ],
  },

  // ── RRHH ────────────────────────────────────────────────────────────────────
  "rrhh": {
    activityTypes: {
      entrevista:          { label: "Entrevista",   kpiLabel: "Entrevistas",   icon: UserIcon,      color: "text-blue-600 dark:text-blue-400",     dot: "bg-blue-500"    },
      onboarding:          { label: "Onboarding",   kpiLabel: "Onboardings",   icon: UserCheckIcon, color: "text-emerald-600 dark:text-emerald-400",dot: "bg-emerald-500" },
      evaluacion:          { label: "Evaluación",   kpiLabel: "Evaluaciones",  icon: TrendingUpIcon, color: "text-orange-600 dark:text-orange-400", dot: "bg-orange-500"  },
      capacitacion_rrhh:   { label: "Capacitación", kpiLabel: "Capacitaciones",icon: BookOpenIcon,  color: "text-violet-600 dark:text-violet-400", dot: "bg-violet-500"  },
      baja:                { label: "Baja",          kpiLabel: "Bajas",         icon: UserMinusIcon, color: "text-destructive dark:text-destructive", dot: "bg-destructive" },
    },
    activityTypesOrder: ["entrevista", "onboarding", "evaluacion", "capacitacion_rrhh", "baja"],
    responsables: [
      { id: "laura",   nombre: "Laura Pérez",     initials: "LP" },
      { id: "marco",   nombre: "Marco Ríos",      initials: "MR" },
      { id: "alejandra", nombre: "Alejandra Vega", initials: "AV" },
      { id: "tomas",   nombre: "Tomás Guerrero",  initials: "TG" },
    ],
    activities: [
      { id: "r1", tipo: "entrevista",        estado: "completado",  titulo: "Entrevista — Candidato Gerente Ventas Norte",       detalle: "Perfil técnico aprobado · avanza a segunda fase",     responsableId: "laura",     timestamp: d(0, 15, 0)  },
      { id: "r2", tipo: "onboarding",        estado: "en_proceso",  titulo: "Onboarding — Ana Martínez · Analista CRM",          detalle: "Semana 2 de 4 · capacitación en sistemas internos",   responsableId: "marco",     timestamp: d(0, 13, 30) },
      { id: "r3", tipo: "evaluacion",        estado: "pendiente",   titulo: "Evaluación semestral — Equipo Ventas CDMX",          detalle: "28 colaboradores · período Ene–Jun 2026",             responsableId: "alejandra", timestamp: d(0, 10, 45) },
      { id: "r4", tipo: "capacitacion_rrhh", estado: "completado",  titulo: "Capacitación completada — Liderazgo y Comunicación", detalle: "12 gerentes certificados · modalidad presencial",     responsableId: "tomas",     timestamp: d(1, 17,  0) },
      { id: "r5", tipo: "entrevista",        estado: "pendiente",   titulo: "Entrevista agendada — Coordinador Postventa",        detalle: "Lunes 10am · entrevista final con dirección",         responsableId: "laura",     timestamp: d(1, 14, 20) },
      { id: "r6", tipo: "baja",              estado: "completado",  titulo: "Baja procesada — R. Mendoza · Área Distribuidores",  detalle: "Baja voluntaria · liquidación conforme a ley",        responsableId: "marco",     timestamp: d(2, 16, 30) },
      { id: "r7", tipo: "onboarding",        estado: "completado",  titulo: "Onboarding completado — Luis Vargas · Vendedor Sr.", detalle: "4 semanas concluidas · accesos y equipos entregados", responsableId: "alejandra", timestamp: d(2,  9, 15) },
      { id: "r8", tipo: "evaluacion",        estado: "en_proceso",  titulo: "Evaluación de desempeño — Área Postventa",           detalle: "16 colaboradores · resultados preliminares listos",   responsableId: "tomas",     timestamp: d(3, 15, 50) },
    ],
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getWorkspace(id: string): Workspace | undefined {
  return workspaces.find((w) => w.id === id)
}
