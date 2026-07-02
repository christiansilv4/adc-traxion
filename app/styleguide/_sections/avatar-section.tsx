"use client"

import { Section, ComponentDemo } from "./shared"
import { Separator } from "@/components/ui/separator"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { PlusIcon } from "lucide-react"

export function AvatarSection() {
  return (
    <Section id="avatars" title="Avatars">

      {/* Tamaños */}
      <ComponentDemo
        title="Tamaños — sm / default / lg"
        code={`import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// size: "sm" | "default" | "lg"

<Avatar size="sm">
  <AvatarImage src="..." alt="Carlos Méndez" />
  <AvatarFallback>CM</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarImage src="..." alt="Ana López" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>

<Avatar size="lg">
  <AvatarImage src="..." alt="Juan Ramírez" />
  <AvatarFallback>JR</AvatarFallback>
</Avatar>`}
      >
        <div className="flex items-center gap-4">
          <Avatar size="sm">
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>JR</AvatarFallback>
          </Avatar>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Con imagen */}
      <ComponentDemo
        title="Con imagen"
        code={`<Avatar>
  <AvatarImage src="/avatars/carlos.jpg" alt="Carlos Méndez" />
  <AvatarFallback>CM</AvatarFallback>
</Avatar>

// AvatarFallback se muestra automáticamente si la imagen falla.`}
      >
        <div className="flex items-center gap-4">
          <Avatar size="sm">
            <AvatarImage
              src="https://i.pravatar.cc/40?img=11"
              alt="Carlos Méndez"
            />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://i.pravatar.cc/40?img=5"
              alt="Ana López"
            />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage
              src="https://i.pravatar.cc/40?img=33"
              alt="Juan Ramírez"
            />
            <AvatarFallback>JR</AvatarFallback>
          </Avatar>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Badge */}
      <ComponentDemo
        title="AvatarBadge — indicador de estado"
        code={`import { Avatar, AvatarFallback, AvatarBadge } from "@/components/ui/avatar"

// AvatarBadge hereda el tamaño del Avatar padre vía group-data-[size].
// Personaliza con className para cambiar el color del indicador.

<Avatar>
  <AvatarFallback>CM</AvatarFallback>
  <AvatarBadge className="bg-green-500" />   {/* en línea */}
</Avatar>

<Avatar>
  <AvatarFallback>AL</AvatarFallback>
  <AvatarBadge className="bg-yellow-500" />  {/* ausente */}
</Avatar>

<Avatar>
  <AvatarFallback>JR</AvatarFallback>
  <AvatarBadge className="bg-muted" />       {/* desconectado */}
</Avatar>`}
      >
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="lg">
              <AvatarFallback>CM</AvatarFallback>
              <AvatarBadge className="bg-green-500" />
            </Avatar>
            <span className="text-xs text-muted-foreground">En línea</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="lg">
              <AvatarFallback>AL</AvatarFallback>
              <AvatarBadge className="bg-yellow-500" />
            </Avatar>
            <span className="text-xs text-muted-foreground">Ausente</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="lg">
              <AvatarFallback>JR</AvatarFallback>
              <AvatarBadge className="bg-muted-foreground/40" />
            </Avatar>
            <span className="text-xs text-muted-foreground">Desconectado</span>
          </div>
        </div>
      </ComponentDemo>

      <Separator />

      {/* AvatarGroup */}
      <ComponentDemo
        title="AvatarGroup — grupo apilado"
        code={`import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { PlusIcon } from "lucide-react"

// AvatarGroupCount muestra un conteo cuando hay más avatares de los que se muestran.

<AvatarGroup>
  <Avatar><AvatarFallback>CM</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>JR</AvatarFallback></Avatar>
  <AvatarGroupCount>+4</AvatarGroupCount>
</AvatarGroup>

// También acepta un ícono:
<AvatarGroupCount><PlusIcon /></AvatarGroupCount>`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">sm</span>
            <AvatarGroup>
              <Avatar size="sm"><AvatarFallback>CM</AvatarFallback></Avatar>
              <Avatar size="sm"><AvatarFallback>AL</AvatarFallback></Avatar>
              <Avatar size="sm"><AvatarFallback>JR</AvatarFallback></Avatar>
              <Avatar size="sm"><AvatarFallback>MT</AvatarFallback></Avatar>
            </AvatarGroup>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">default</span>
            <AvatarGroup>
              <Avatar><AvatarFallback>CM</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>JR</AvatarFallback></Avatar>
              <AvatarGroupCount>+4</AvatarGroupCount>
            </AvatarGroup>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">lg</span>
            <AvatarGroup>
              <Avatar size="lg"><AvatarFallback>CM</AvatarFallback></Avatar>
              <Avatar size="lg"><AvatarFallback>AL</AvatarFallback></Avatar>
              <Avatar size="lg"><AvatarFallback>JR</AvatarFallback></Avatar>
              <AvatarGroupCount><PlusIcon /></AvatarGroupCount>
            </AvatarGroup>
          </div>
        </div>
      </ComponentDemo>

    </Section>
  )
}
