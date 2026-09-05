# Свой ритм

Личный журнал питания, сна, активности, работы и самочувствия. Интерфейс публикуется через GitHub Pages, данные хранятся в Supabase и доступны только вошедшему пользователю.

## Настройка Supabase

1. Создайте проект Supabase.
2. Выполните `supabase/schema.sql` в SQL Editor.
3. В Authentication добавьте адрес GitHub Pages в Redirect URLs.
4. Скопируйте Project URL и publishable key.

## Настройка GitHub Pages

В Settings → Secrets and variables → Actions добавьте:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

В Settings → Pages выберите GitHub Actions как источник публикации. Workflow публикует приложение после каждого изменения ветки `main`. Файл `app/seed.json` содержит локальные данные и не должен попадать в GitHub.

