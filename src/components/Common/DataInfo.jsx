import React, { useState } from 'react';

export default function DataInfo() {
  const [showInfo, setShowInfo] = useState(false);

  if (!showInfo) {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000
      }}>
        <button
          onClick={() => setShowInfo(true)}
          style={{
            background: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          title="Thông tin quan trọng"
        >
          ℹ️
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '8px',
      padding: '15px',
      maxWidth: '300px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>
            📱 Lưu ý về dữ liệu
          </h4>
          <p style={{ margin: '0', fontSize: '14px', color: '#856404' }}>
            Dữ liệu tasks được lưu trên <strong>thiết bị này</strong>. 
            Thiết bị khác sẽ có dữ liệu riêng.
          </p>
        </div>
        <button
          onClick={() => setShowInfo(false)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#856404'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}