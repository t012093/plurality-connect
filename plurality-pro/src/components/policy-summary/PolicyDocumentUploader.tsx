import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { PolicyDocument } from '../../pages/PolicySummaryPage';

const UploaderContainer = styled.div`
  padding: 25px;
`;

const UploaderHeader = styled.div`
  margin-bottom: 25px;
`;

const HeaderTitle = styled.h3`
  color: #f1f5f9;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderDescription = styled.p`
  color: #94a3b8;
  font-size: 14px;
  margin: 0 0 15px 0;
  line-height: 1.5;
`;

const UserRoleIndicator = styled.div<{ role: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${props => {
    switch (props.role) {
      case 'admin': return 'rgba(239, 68, 68, 0.2)';
      case 'official': return 'rgba(6, 182, 212, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.role) {
      case 'admin': return '#ef4444';
      case 'official': return '#06b6d4';
      default: return '#6b7280';
    }
  }};
  color: ${props => {
    switch (props.role) {
      case 'admin': return '#ef4444';
      case 'official': return '#06b6d4';
      default: return '#6b7280';
    }
  }};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 600;
`;

const Input = styled.input`
  background: rgba(51, 65, 85, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.5);
  color: #f1f5f9;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #06b6d4;
    background: rgba(6, 182, 212, 0.1);
  }
  
  &::placeholder {
    color: #64748b;
  }
`;

const Select = styled.select`
  background: rgba(51, 65, 85, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.5);
  color: #f1f5f9;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #06b6d4;
    background: rgba(6, 182, 212, 0.1);
  }
  
  option {
    background: rgba(15, 23, 42, 0.95);
    color: #f1f5f9;
  }
`;

const FileUploadArea = styled.div<{ isDragging: boolean; hasFile: boolean }>`
  border: 2px dashed ${props => {
    if (props.hasFile) return '#10b981';
    if (props.isDragging) return '#06b6d4';
    return 'rgba(71, 85, 105, 0.5)';
  }};
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => {
    if (props.hasFile) return 'rgba(16, 185, 129, 0.1)';
    if (props.isDragging) return 'rgba(6, 182, 212, 0.1)';
    return 'rgba(51, 65, 85, 0.3)';
  }};
  
  &:hover {
    border-color: #06b6d4;
    background: rgba(6, 182, 212, 0.1);
  }
`;

const FileUploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const FileUploadText = styled.div`
  color: #cbd5e1;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const FileUploadSubtext = styled.div`
  color: #64748b;
  font-size: 14px;
`;

const FileInfo = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const FileName = styled.div`
  color: #10b981;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RemoveFileButton = styled.button`
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  background: ${props => props.disabled 
    ? 'rgba(51, 65, 85, 0.5)' 
    : 'linear-gradient(135deg, #06b6d4, #0891b2)'};
  border: 1px solid ${props => props.disabled 
    ? 'rgba(71, 85, 105, 0.5)' 
    : '#06b6d4'};
  color: ${props => props.disabled ? '#64748b' : '#f1f5f9'};
  padding: 14px 24px;
  border-radius: 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(6, 182, 212, 0.3);
  }
`;

const ValidationMessage = styled.div<{ type: 'error' | 'warning' | 'success' }>`
  background: ${props => {
    switch (props.type) {
      case 'error': return 'rgba(239, 68, 68, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'success': return 'rgba(16, 185, 129, 0.1)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'success': return '#10b981';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'success': return '#10b981';
    }
  }};
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

interface PolicyDocumentUploaderProps {
  onUpload: (document: Partial<PolicyDocument>) => void;
  userRole: 'admin' | 'official' | 'verified_citizen';
}

const PolicyDocumentUploader: React.FC<PolicyDocumentUploaderProps> = ({
  onUpload,
  userRole
}) => {
  const [formData, setFormData] = useState({
    title: '',
    municipality: '',
    department: '',
    documentType: 'policy' as const,
    sourceUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validationMessage, setValidationMessage] = useState<{
    type: 'error' | 'warning' | 'success';
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const municipalities = [
    '富山市', '高岡市', '魚津市', '氷見市', '滑川市', '黒部市', '砺波市', 
    '小矢部市', '南砺市', '射水市', '舟橋村', '上市町', '立山町', '入善町', '朝日町'
  ];

  const departments = [
    '企画管理部', '総務部', '財務部', '市民生活部', '福祉保健部', 
    '環境部', '商工労働部', '農林水産部', '建設部', '都市整備部', 
    '上下水道部', '消防本部', '教育委員会', '議会事務局'
  ];

  const documentTypes = [
    { value: 'policy', label: '政策・施策' },
    { value: 'ordinance', label: '条例・規則' },
    { value: 'plan', label: '基本計画・構想' },
    { value: 'report', label: '報告書・白書' }
  ];

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return '🛡️ システム管理者';
      case 'official': return '🏛️ 自治体職員';
      case 'verified_citizen': return '👤 認証済み市民';
      default: return '👤 一般市民';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationMessage(null);
  };

  const handleFileSelect = (file: File) => {
    // File validation
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (file.size > maxSize) {
      setValidationMessage({
        type: 'error',
        message: 'ファイルサイズが50MBを超えています。'
      });
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setValidationMessage({
        type: 'error',
        message: '対応していないファイル形式です。PDF、Word、テキストファイルをご利用ください。'
      });
      return;
    }

    setSelectedFile(file);
    setValidationMessage({
      type: 'success',
      message: 'ファイルが正常に選択されました。'
    });
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setValidationMessage({
        type: 'error',
        message: 'タイトルを入力してください。'
      });
      return false;
    }

    if (!formData.municipality) {
      setValidationMessage({
        type: 'error',
        message: '自治体を選択してください。'
      });
      return false;
    }

    if (!selectedFile && !formData.sourceUrl.trim()) {
      setValidationMessage({
        type: 'error',
        message: 'ファイルをアップロードするか、URLを入力してください。'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setValidationMessage({
      type: 'success',
      message: 'アップロード中です...'
    });

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onUpload({
        ...formData,
        originalFileName: selectedFile?.name,
        fileSize: selectedFile?.size
      });

      // Reset form
      setFormData({
        title: '',
        municipality: '',
        department: '',
        documentType: 'policy',
        sourceUrl: ''
      });
      setSelectedFile(null);
      
      setValidationMessage({
        type: 'success',
        message: 'アップロードが完了しました。AI要約処理を開始します。'
      });
    } catch (error) {
      setValidationMessage({
        type: 'error',
        message: 'アップロードに失敗しました。もう一度お試しください。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UploaderContainer>
      <UploaderHeader>
        <HeaderTitle>
          📤 政策文書アップロード
        </HeaderTitle>
        <HeaderDescription>
          政策文書をアップロードしてAI要約を生成します。
          Phase 1では管理者と認証済みユーザーのみが投稿可能です。
        </HeaderDescription>
        <UserRoleIndicator role={userRole}>
          {getRoleLabel(userRole)}
        </UserRoleIndicator>
      </UploaderHeader>

      <UploadForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">文書タイトル *</Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="例: 富山市DX推進計画 2024-2026"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="municipality">自治体 *</Label>
          <Select
            id="municipality"
            value={formData.municipality}
            onChange={(e) => handleInputChange('municipality', e.target.value)}
            required
          >
            <option value="">自治体を選択</option>
            {municipalities.map(municipality => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="department">担当部署</Label>
          <Select
            id="department"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
          >
            <option value="">担当部署を選択</option>
            {departments.map(department => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="documentType">文書種別</Label>
          <Select
            id="documentType"
            value={formData.documentType}
            onChange={(e) => handleInputChange('documentType', e.target.value)}
          >
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>ファイルアップロード</Label>
          <FileUploadArea
            isDragging={isDragging}
            hasFile={!!selectedFile}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
          >
            <FileUploadIcon>
              {selectedFile ? '📄' : '📤'}
            </FileUploadIcon>
            <FileUploadText>
              {selectedFile ? 'ファイルが選択されました' : 'ファイルをドラッグ&ドロップまたはクリック'}
            </FileUploadText>
            <FileUploadSubtext>
              PDF, Word, テキストファイル対応 (最大50MB)
            </FileUploadSubtext>
          </FileUploadArea>
          
          {selectedFile && (
            <FileInfo>
              <FileName>
                📄 {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </FileName>
              <RemoveFileButton onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                setValidationMessage(null);
              }}>
                ✕
              </RemoveFileButton>
            </FileInfo>
          )}
          
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="sourceUrl">または公開URL</Label>
          <Input
            id="sourceUrl"
            type="url"
            value={formData.sourceUrl}
            onChange={(e) => handleInputChange('sourceUrl', e.target.value)}
            placeholder="https://example.com/policy-document.pdf"
          />
        </FormGroup>

        {validationMessage && (
          <ValidationMessage type={validationMessage.type}>
            {validationMessage.type === 'error' && '⚠️'}
            {validationMessage.type === 'warning' && '⚡'}
            {validationMessage.type === 'success' && '✅'}
            {validationMessage.message}
          </ValidationMessage>
        )}

        <SubmitButton 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>🔄 アップロード中...</>
          ) : (
            <>📤 アップロード開始</>
          )}
        </SubmitButton>
      </UploadForm>
    </UploaderContainer>
  );
};

export default PolicyDocumentUploader;