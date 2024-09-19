import type { EdgeOptions, GraphOptions, NodeOptions } from '@antv/xflow';

export interface DiffGraphOptions {
  originalData: GraphData;
  currentData: GraphData;
  addColor?: string;
  addExtAttr?: object;
  delColor?: string;
  delExtAttr?: object;
  changeColor?: string;
  changeExtAttr?: object;
  graphOptions?: GraphOptions;
  /** 展示diff详情 */
  showDiffDetail?: boolean;
  /** 自定义渲染diff详情 */
  customRenderDiffDetail?: (detail: DiffInfo[]) => React.ReactNode;
  /** 节点描述字段属性key  */
  nodeDescKey?: string;
  /** 边描述字段属性key  */
  edgeDescKey?: string;
}

export interface DiffDetailPanelProps
  extends Pick<
      DiffGraphOptions,
      'showDiffDetail' | 'customRenderDiffDetail' | 'nodeDescKey' | 'edgeDescKey'
    >,
    Required<Pick<DiffGraphOptions, 'addColor' | 'delColor' | 'changeColor'>> {
  diffDetailInfo?: DiffInfo[];
}

export interface GraphData {
  nodes: NodeOptions[];
  edges: EdgeOptions[];
}

export type DiffType = 'DEL' | 'ADD' | 'CHG' | 'NONE';

type CellType = 'Node' | 'Edge';

export interface NodeOptionsWithDiffInfo extends NodeOptions {
  diffType?: DiffType;
}
export interface EdgeOptionsWithDiffInfo extends EdgeOptions {
  diffType?: DiffType;
}

export type DiffInfo =
  | {
      diffType: DiffType;
      originalData?: NodeOptions | EdgeOptions;
      currentData: NodeOptions | EdgeOptions;
      cellType: CellType;
    }
  | {
      diffType: DiffType;
      originalData?: NodeOptions;
      currentData: NodeOptions;
      cellType: 'Node';
    }
  | {
      diffType: DiffType;
      originalData?: EdgeOptions;
      currentData: EdgeOptions;
      cellType: 'Edge';
    };

export interface GraphDataWithDiffInfo {
  nodes: NodeOptionsWithDiffInfo[];
  edges: EdgeOptionsWithDiffInfo[];
}
