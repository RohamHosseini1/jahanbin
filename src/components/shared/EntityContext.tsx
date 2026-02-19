'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Entity } from '@/lib/types';

interface EntityContextType {
  selectedEntity: Entity | null;
  setSelectedEntity: (entity: Entity | null) => void;
  miniProfilePosition: { x: number; y: number } | null;
  setMiniProfilePosition: (pos: { x: number; y: number } | null) => void;
}

const EntityContext = createContext<EntityContextType>({
  selectedEntity: null,
  setSelectedEntity: () => {},
  miniProfilePosition: null,
  setMiniProfilePosition: () => {},
});

export function EntityProvider({ children }: { children: ReactNode }) {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [miniProfilePosition, setMiniProfilePosition] = useState<{ x: number; y: number } | null>(null);

  return (
    <EntityContext.Provider value={{
      selectedEntity,
      setSelectedEntity,
      miniProfilePosition,
      setMiniProfilePosition,
    }}>
      {children}
    </EntityContext.Provider>
  );
}

export function useEntityContext() {
  return useContext(EntityContext);
}
