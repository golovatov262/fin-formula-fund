import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const DOCS_URL = 'https://functions.poehali.dev/aaf60092-d5d3-4009-a71d-89ce64ad3157';

interface Doc {
  slug: string;
  title: string;
  description: string;
  url: string | null;
  uploaded: boolean;
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [authError, setAuthError] = useState('');
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const loadDocuments = async (t: string) => {
    const res = await fetch(DOCS_URL, {
      headers: { 'X-Authorization': `Bearer ${t}` },
    });
    const data = await res.json();
    setDocuments(data.documents || []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(DOCS_URL, {
      headers: { 'X-Authorization': `Bearer ${password}` },
    });
    if (res.ok) {
      setToken(password);
      setAuthError('');
      const data = await res.json();
      setDocuments(data.documents || []);
    } else {
      setAuthError('Неверный пароль');
    }
  };

  const handleUpload = async (slug: string, file: File) => {
    setUploading(slug);
    setMessage('');
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const res = await fetch(DOCS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ slug, file: base64 }),
      });
      if (res.ok) {
        setMessage(`✓ Файл успешно загружен`);
        await loadDocuments(token);
      } else {
        setMessage('Ошибка при загрузке');
      }
      setUploading(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (doc: Doc, removeEntry: boolean) => {
    const confirmText = removeEntry
      ? `Удалить документ "${doc.title}" вместе с записью?`
      : `Удалить файл "${doc.title}"? Карточка останется.`;
    if (!confirm(confirmText)) return;
    setDeleting(doc.slug);
    setMessage('');
    const res = await fetch(DOCS_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ slug: doc.slug, removeEntry }),
    });
    if (res.ok) {
      setMessage(removeEntry ? `Документ "${doc.title}" удалён` : `Файл "${doc.title}" удалён`);
      await loadDocuments(token);
    }
    setDeleting(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    setMessage('');
    const res = await fetch(DOCS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ action: 'create', title: newTitle.trim(), description: newDescription.trim() }),
    });
    if (res.ok) {
      setMessage(`✓ Документ "${newTitle}" добавлен. Теперь загрузите PDF-файл.`);
      setNewTitle('');
      setNewDescription('');
      setShowAdd(false);
      await loadDocuments(token);
    } else {
      setMessage('Ошибка при добавлении документа');
    }
    setCreating(false);
  };

  const startEdit = (doc: Doc) => {
    setEditing(doc.slug);
    setEditTitle(doc.title);
    setEditDescription(doc.description || '');
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditTitle('');
    setEditDescription('');
  };

  const saveEdit = async (slug: string) => {
    setSavingEdit(true);
    setMessage('');
    const res = await fetch(DOCS_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ slug, title: editTitle.trim(), description: editDescription.trim() }),
    });
    if (res.ok) {
      setMessage('✓ Изменения сохранены');
      cancelEdit();
      await loadDocuments(token);
    } else {
      setMessage('Ошибка при сохранении');
    }
    setSavingEdit(false);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ФФ</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">ФИН ФОРМУЛА</h1>
              <p className="text-xs text-muted-foreground">Административная панель</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Введите пароль"
                autoFocus
              />
              {authError && <p className="text-red-500 text-xs mt-1">{authError}</p>}
            </div>
            <Button type="submit" className="w-full gradient-purple-blue text-white">
              Войти
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ФФ</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">Административная панель</h1>
              <p className="text-xs text-muted-foreground">Управление документами</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setToken('')}>
            <Icon name="LogOut" size={16} />
            Выйти
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Документы</h2>
          <Button
            className="gradient-purple-blue text-white"
            onClick={() => setShowAdd(!showAdd)}
          >
            <Icon name={showAdd ? 'X' : 'Plus'} size={16} />
            {showAdd ? 'Отмена' : 'Добавить документ'}
          </Button>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {message}
          </div>
        )}

        {showAdd && (
          <form onSubmit={handleCreate} className="mb-6 bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Название документа *</label>
              <Input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Например: Политика обработки персональных данных"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Описание</label>
              <Textarea
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder="Краткое описание документа"
                rows={2}
              />
            </div>
            <Button
              type="submit"
              className="gradient-purple-blue text-white"
              disabled={creating || !newTitle.trim()}
            >
              <Icon name={creating ? 'Loader2' : 'Check'} size={16} className={creating ? 'animate-spin' : ''} />
              Создать карточку
            </Button>
          </form>
        )}

        <div className="space-y-3">
          {documents.map(doc => (
            <div key={doc.slug} className="bg-white rounded-xl border border-gray-200 p-4">
              {editing === doc.slug ? (
                <div className="space-y-3">
                  <Input
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    placeholder="Название документа"
                  />
                  <Textarea
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                    placeholder="Описание"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="gradient-purple-blue text-white"
                      onClick={() => saveEdit(doc.slug)}
                      disabled={savingEdit || !editTitle.trim()}
                    >
                      <Icon name={savingEdit ? 'Loader2' : 'Check'} size={14} className={savingEdit ? 'animate-spin' : ''} />
                      Сохранить
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      <Icon name="X" size={14} />
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={24} className="text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{doc.title}</p>
                    {doc.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{doc.description}</p>
                    )}
                    <p className="text-xs mt-1">
                      {doc.uploaded ? (
                        <span className="text-green-600 inline-flex items-center gap-1">
                          <Icon name="CheckCircle" size={12} />
                          Файл загружен
                        </span>
                      ) : (
                        <span className="text-gray-400">Файл не загружен</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                    {doc.uploaded && (
                      <a href={doc.url!} target="_blank" rel="noreferrer">
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={14} />
                          <span className="hidden sm:inline">Просмотр</span>
                        </Button>
                      </a>
                    )}
                    <Button variant="outline" size="sm" onClick={() => startEdit(doc)}>
                      <Icon name="Pencil" size={14} />
                      <span className="hidden sm:inline">Изменить</span>
                    </Button>
                    <input
                      ref={el => { fileRefs.current[doc.slug] = el; }}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(doc.slug, file);
                        e.target.value = '';
                      }}
                    />
                    <Button
                      size="sm"
                      className="gradient-purple-blue text-white"
                      onClick={() => fileRefs.current[doc.slug]?.click()}
                      disabled={uploading === doc.slug}
                    >
                      <Icon name={uploading === doc.slug ? 'Loader2' : 'Upload'} size={14} className={uploading === doc.slug ? 'animate-spin' : ''} />
                      <span className="hidden sm:inline">{doc.uploaded ? 'Заменить' : 'Загрузить'}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(doc, true)}
                      disabled={deleting === doc.slug}
                    >
                      <Icon name={deleting === doc.slug ? 'Loader2' : 'Trash2'} size={14} className={deleting === doc.slug ? 'animate-spin' : ''} />
                      <span className="hidden sm:inline">Удалить</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
