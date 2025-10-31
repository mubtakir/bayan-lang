/**
 * محرر البيان الأساسي
 * Bayan Basic Editor Component
 */

import React, { useRef, useEffect, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { bracketMatching, foldGutter, foldKeymap } from '@codemirror/language';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { lintKeymap } from '@codemirror/lint';

import { bayanLightTheme, bayanDarkTheme, bayanArabicTheme } from '../themes/bayanTheme';
import { bayanLightSyntax, bayanDarkSyntax } from '../themes/bayanSyntax';
import { bayanAutocomplete } from '../utils/bayanAutocomplete';

/**
 * أنواع السمات المتاحة
 * Available Theme Types
 */
export type ThemeType = 'light' | 'dark' | 'arabic';

/**
 * خصائص مكون المحرر
 * Editor Component Props
 */
export interface BayanEditorProps {
  /** المحتوى الأولي - Initial content */
  initialContent?: string;
  /** السمة - Theme */
  theme?: ThemeType;
  /** دالة التغيير - On change callback */
  onChange?: (content: string) => void;
  /** دالة الحفظ - On save callback */
  onSave?: (content: string) => void;
  /** القراءة فقط - Read only */
  readOnly?: boolean;
  /** الارتفاع - Height */
  height?: string;
  /** عرض أرقام الأسطر - Show line numbers */
  showLineNumbers?: boolean;
}

/**
 * مكون محرر البيان
 * Bayan Editor Component
 */
export const BayanEditor: React.FC<BayanEditorProps> = ({
  initialContent = '// اكتب كود البيان هنا\n// Write Bayan code here\n\nاطبع("مرحباً بالعالم! 🌍")\nprint("Hello World! 🌍")',
  theme = 'light',
  onChange,
  onSave,
  readOnly = false,
  height = '100%',
  showLineNumbers = true
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(theme);

  /**
   * تهيئة المحرر
   * Initialize Editor
   */
  useEffect(() => {
    if (!editorRef.current) return;

    // اختيار السمة
    const themeExtension = currentTheme === 'dark' 
      ? bayanDarkTheme 
      : currentTheme === 'arabic'
      ? bayanArabicTheme
      : bayanLightTheme;

    const syntaxExtension = currentTheme === 'dark'
      ? bayanDarkSyntax
      : bayanLightSyntax;

    // إنشاء حالة المحرر
    const startState = EditorState.create({
      doc: initialContent,
      extensions: [
        // الميزات الأساسية
        showLineNumbers ? lineNumbers() : [],
        highlightActiveLineGutter(),
        highlightActiveLine(),
        history(),
        foldGutter(),
        bracketMatching(),
        highlightSelectionMatches(),
        
        // اللغة والإكمال التلقائي
        javascript(),
        autocompletion({
          override: [bayanAutocomplete],
          activateOnTyping: true,
          maxRenderedOptions: 10
        }),
        
        // السمات
        themeExtension,
        syntaxExtension,
        
        // اختصارات لوحة المفاتيح
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...searchKeymap,
          ...lintKeymap,
          // اختصار الحفظ
          {
            key: 'Ctrl-s',
            mac: 'Cmd-s',
            run: (view) => {
              if (onSave) {
                onSave(view.state.doc.toString());
              }
              return true;
            }
          }
        ]),
        
        // مستمع التغييرات
        EditorView.updateListener.of(update => {
          if (update.docChanged && onChange) {
            const content = update.state.doc.toString();
            onChange(content);
          }
        }),
        
        // القراءة فقط
        EditorView.editable.of(!readOnly),
        
        // الارتفاع
        EditorView.theme({
          '&': { height: height }
        })
      ]
    });

    // إنشاء عرض المحرر
    editorViewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current
    });

    // التنظيف
    return () => {
      editorViewRef.current?.destroy();
      editorViewRef.current = null;
    };
  }, [currentTheme, showLineNumbers, readOnly, height]);

  /**
   * تحديث المحتوى عند تغيير initialContent
   * Update content when initialContent changes
   */
  useEffect(() => {
    if (editorViewRef.current && initialContent !== editorViewRef.current.state.doc.toString()) {
      const transaction = editorViewRef.current.state.update({
        changes: {
          from: 0,
          to: editorViewRef.current.state.doc.length,
          insert: initialContent
        }
      });
      editorViewRef.current.dispatch(transaction);
    }
  }, [initialContent]);

  /**
   * تحديث السمة
   * Update theme
   */
  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  /**
   * دوال عامة للتحكم في المحرر
   * Public methods to control the editor
   */
  const getContent = (): string => {
    return editorViewRef.current?.state.doc.toString() || '';
  };

  const setContent = (content: string): void => {
    if (editorViewRef.current) {
      const transaction = editorViewRef.current.state.update({
        changes: {
          from: 0,
          to: editorViewRef.current.state.doc.length,
          insert: content
        }
      });
      editorViewRef.current.dispatch(transaction);
    }
  };

  const focus = (): void => {
    editorViewRef.current?.focus();
  };

  // حفظ الدوال في ref للوصول إليها من الخارج
  useEffect(() => {
    if (editorRef.current) {
      (editorRef.current as any).getContent = getContent;
      (editorRef.current as any).setContent = setContent;
      (editorRef.current as any).focus = focus;
    }
  });

  return (
    <div 
      ref={editorRef} 
      className="bayan-editor"
      style={{
        width: '100%',
        height: height,
        overflow: 'auto',
        fontFamily: '"Fira Code", "Cairo", "Consolas", monospace'
      }}
    />
  );
};

/**
 * Hook لاستخدام المحرر
 * Hook to use the editor
 */
export const useBayanEditor = (editorRef: React.RefObject<HTMLDivElement>) => {
  const getContent = (): string => {
    return (editorRef.current as any)?.getContent?.() || '';
  };

  const setContent = (content: string): void => {
    (editorRef.current as any)?.setContent?.(content);
  };

  const focus = (): void => {
    (editorRef.current as any)?.focus?.();
  };

  return { getContent, setContent, focus };
};

export default BayanEditor;

