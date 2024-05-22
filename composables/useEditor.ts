import type { Entity } from "~/types";

export const useEditor = () => {
  const content_state_api = useState<string>("content_state_api", () => "");

  const annotation_result = useState<Entity[]>("annotation_result", () => []);

  const startToEndList = useState<Entity[]>("startToEndList", () => []);

  const selectedNodeStartToEndList = useState<Entity[]>("selectedNodeStartToEndList", () => []);

  const clickedEntityObject = useState<Entity[]>("clickedEntity", () => []);

  const clickedNode = useState<Entity[]>("clickedNodeLabel", () => []);

  const uploadedNodes = useState<Entity[]>("uploadedNodes", () => []);

  return {
    content_state_api,
    annotation_result,
    startToEndList,
    selectedNodeStartToEndList,
    clickedEntityObject,
    clickedNode,
    uploadedNodes,
  };
};
