import type { EdgeOptions, NodeOptions } from '@antv/xflow';
import { Table, Tag } from 'antd';
import React from 'react';

import type { DiffDetailPanelProps, DiffInfo } from '@/types';

import './index.less';

export const DiffDetailPanel: React.FC<DiffDetailPanelProps> = (props) => {
  const {
    showDiffDetail,
    diffDetailInfo,
    customRenderDiffDetail,
    addColor,
    delColor,
    changeColor,
    nodeDescKey = 'label',
    edgeDescKey = 'id',
  } = props;
  if (!showDiffDetail || !diffDetailInfo?.length) {
    return <React.Fragment />;
  }

  /**
   * diff详情描述词典
   */
  const DiffTypeDict: {
    [keys in Exclude<DiffInfo['diffType'], 'NONE'>]: {
      color: string;
      text: string;
    };
  } = {
    ADD: {
      color: addColor,
      text: '新增',
    },
    DEL: {
      color: delColor,
      text: '删除',
    },
    CHG: {
      color: changeColor,
      text: '变更',
    },
  };

  const CellDict: {
    [keys in DiffInfo['cellType']]: string;
  } = {
    Edge: '边',
    Node: '节点',
  };

  const getDesc = (data: DiffInfo['currentData'], cellType: DiffInfo['cellType']) => {
    if (cellType === 'Node') {
      return (data as NodeOptions)[nodeDescKey];
    } else {
      return (data as EdgeOptions)[edgeDescKey];
    }
  };

  const defaultDiffPanel = (
    <Table<DiffInfo>
      title={() => <span className="table-header">{'Diff变更详情列表'}</span>}
      pagination={false}
      bodyStyle={{ textAlign: 'center' }}
      bordered
      columns={[
        {
          title: '变更详情',
          dataIndex: 'currentData',
          render: (currentData: DiffInfo['currentData'], record) => {
            const oriPreStr = record.originalData
              ? getDesc(record.originalData, record.cellType) + ' -> '
              : '';
            const curStr = getDesc(currentData, record.cellType);
            return `${oriPreStr}${curStr}`;
          },
        },
        {
          title: '元素类型',
          dataIndex: 'cellType',
          render: (text: DiffInfo['cellType']) => {
            return CellDict[text];
          },
        },
        {
          title: '变更类型',
          dataIndex: 'diffType',
          render: (text: Exclude<DiffInfo['diffType'], 'NONE'>) => {
            const dicVal = DiffTypeDict[text];
            return (
              <Tag color={dicVal.color} className="info-tag">
                {dicVal.text}
              </Tag>
            );
          },
        },
      ]}
      dataSource={diffDetailInfo}
    />
  );

  return (
    <div className="xflow-diff-panel">
      {customRenderDiffDetail
        ? customRenderDiffDetail(diffDetailInfo)
        : defaultDiffPanel}
    </div>
  );
};
