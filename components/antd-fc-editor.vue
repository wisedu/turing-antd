<template>
  <div class="editor" v-if="formReadonly !== true">
    <editor-menu-bar :editor="editor">
      <div class="menubar" slot-scope="{ commands, isActive }">

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold" title="加粗"
        >
          <img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGOUIzRUM5MjIwNzExMUU5QURDNkE3MEQzODdFQzhFNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGOUIzRUM5MzIwNzExMUU5QURDNkE3MEQzODdFQzhFNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY5QjNFQzkwMjA3MTExRTlBREM2QTcwRDM4N0VDOEU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY5QjNFQzkxMjA3MTExRTlBREM2QTcwRDM4N0VDOEU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAGAAeAwERAAIRAQMRAf/EAGEAAAIDAQAAAAAAAAAAAAAAAAYHAAQFCAEBAAAAAAAAAAAAAAAAAAAAABAAAgEDAwQBBQAAAAAAAAAAAgMBBAUGABESITETBxVBYSIyFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A6p0ALfvbdus+UPxr4C+XC4oSNVM0FFD1mgto8gF5Bkhg54TO37dNAS4zk9nyS2fI2thkoWGh6XLNL0vVPFiXJZAmtgT3Eo+/aY0GroJoFNlLM0D3eucTRbX1k4zHnG6telUL/vLqE063FJctukx20Fn0w290N0y6wZOhScqm4Rerg2kOTonLuIeNJ0sFAmAANJwkT/LeN9+vQGhoJoF9fvXGX1ucPyu0ZhNpayjG3ppfjqepFdOJw2R5MKOUy3ct5jfrt20G3iGGtsdVcbncbo29X67eEa64uWpEeOmEhSpSUxALAOZT9ZmSmZnQE2g//9k=" alt="加粗">
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic" title="斜体"
        >
          <img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRjVGMUUzMjIwNzExMUU5QkYyRDkxODAxMTMzRjY1OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRjVGMUUzMzIwNzExMUU5QkYyRDkxODAxMTMzRjY1OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZGNUYxRTMwMjA3MTExRTlCRjJEOTE4MDExMzNGNjU4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZGNUYxRTMxMjA3MTExRTlCRjJEOTE4MDExMzNGNjU4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAGAAeAwERAAIRAQMRAf/EAFwAAQEBAQAAAAAAAAAAAAAAAAYABQgBAQAAAAAAAAAAAAAAAAAAAAAQAAEDBAICAwEAAAAAAAAAAAIBAwQAEQUGIRJBB2EiIxQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOqaCoBGn+18ZtWXfxsDCZmP/I89GlTZcRG4zT7CXNk3UM7Gl0+tqBvQVAS9kbRPw2HZgYVBc2jPPJjsCyXKI+YqpyDTn8ozaE6a28W80GrqGrwNX1yDg4KkbUQLOPucuPPGqm8+4vk3XCIy+VoNigqABifXGzs79G27M7WWXWLGfhsQCgMsg2y+vZUAwJepdkHsaD2JBQVW1A/oKg//2Q==" alt="斜体">
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike" title="中划线"
        >
          <img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNTcxNzc5NDIwNzIxMUU5QUQzRUYyRTkxMDdDOTZCMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNTcxNzc5NTIwNzIxMUU5QUQzRUYyRTkxMDdDOTZCMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA1NzE3NzkyMjA3MjExRTlBRDNFRjJFOTEwN0M5NkIzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA1NzE3NzkzMjA3MjExRTlBRDNFRjJFOTEwN0M5NkIzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAGAAeAwERAAIRAQMRAf/EAF4AAQACAwAAAAAAAAAAAAAAAAYABwQFCAEBAAAAAAAAAAAAAAAAAAAAABAAAQQCAgICAwAAAAAAAAAAAgEDBAURBgASIQcxE0FRFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A6p4A7avaVHr1m7V/wWdxYRmAlTY9TDclrHZcUkbN4h6iPfoWEznCZxjgJKS5rrunhXFY8j9fYMhIivIip2bcFCFcLhUXC+UX44GbwJwKCsrf3K37Dl7Jq2kZURbgbPWnbVr7cluOiuRz6g4LseQjT2Ryi5EkyP7Bf6j3m9v66sCFoha/qCsuBDnJOiuA2jCk39X8odXhXuCj5FMfngWdwJwAl163unNgsbjWdqla6t0gLcRW48eU26602jIPNfeKqy59YoKqPhcIuM8BNqutVusa9Coq3usOCHQDeLu6ZESm444WEyZmSkXj5XgbXgf/2Q==" alt="中划线">
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline" title="下划线"
        >
          <img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRDA4QTFFODIwNzIxMUU5ODIxOUI5MEQwRjQ0MkVBNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRDA4QTFFOTIwNzIxMUU5ODIxOUI5MEQwRjQ0MkVBNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBEMDhBMUU2MjA3MjExRTk4MjE5QjkwRDBGNDQyRUE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBEMDhBMUU3MjA3MjExRTk4MjE5QjkwRDBGNDQyRUE3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAGAAeAwERAAIRAQMRAf/EAGMAAAIDAQAAAAAAAAAAAAAAAAYHAAIDCAEBAAAAAAAAAAAAAAAAAAAAABAAAQMEAQQBBAMAAAAAAAAAAgEDBBESBQYAIUEiBzEyEyMzFDQVEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDqd5z7bRuWkdgqVgJUlolaCndV4Apo3sjG7i9kWoOLycH/AC3VjSjyEZGBR8F82UVDPzCqXD2rwKa57Mxue2rJa1HxOVizcT/dflxkajhd1b/JeX7R8g6dU4BhwJwFz6tkR8fnN7wkx0GMmOwSckkYyRDKHNaacZfFF+QWhDVPhRVF4FvXLjWR372DnYRi/iZUuBCiywWrbrsGGgSLCT6kBxyyqdKovAYnAyltyHIrzcZ7+PINshZfUUNGzVFQTsVUQrV6078BS7P6N2PaTZc2La4mUdjoosOyMDBIwFVqood11te1acAp0vSdu116Kw/s7UzBRWybbw7GKiwW0RU8bDYKo2l1pTrwDbgf/9k=" alt="下划线">
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list" title="无序列表"
        >
          <img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozQkE4NkY0RDIwNzIxMUU5OEJGRUJBQUU5RUZGRDhCQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozQkE4NkY0RTIwNzIxMUU5OEJGRUJBQUU5RUZGRDhCQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNCQTg2RjRCMjA3MjExRTk4QkZFQkFBRTlFRkZEOEJDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNCQTg2RjRDMjA3MjExRTk4QkZFQkFBRTlFRkZEOEJDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAGAAeAwERAAIRAQMRAf/EAGAAAQACAwAAAAAAAAAAAAAAAAYABAUHCAEBAAAAAAAAAAAAAAAAAAAAABAAAQQBBAEEAwAAAAAAAAAAAgEDBAUAESEGBxIxUSITQRQVEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDqnAJVnbXWllTFdx+SQW6kZRwP3ZTqRG1ktihk0Kyfq8l8CQk09U3TAsw+zOuJ0tmHC5XTypcgxajxmbCK4444a6CAALikREuyImAkwJgaz4i12PE4i+Ezg9DDtDs3ySniyRhxSjEKKMpTaZmiTxnqhaoKqm66L8cDLVb/AD5bGMkrhlPCiq4KPy2bUnXGgVfkYN/z2/MkT0HzHX3TAbYEwAfHumuM0PG3OPwLC4CI7PdsifbspEeT9rwoJCr0UmCJvQU+Ja77rqu+Bfr+tKiDOYmN2188cdwXQakXVk8ySiuqI404+QGPuJIqL+cBbgf/2Q==" alt="无序列表">
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list" title="有序列表"
        >
          <img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0MDdBQzlFRjIwNzIxMUU5OTREQTkzMTM5NjY1MEE4MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0MDdBQzlGMDIwNzIxMUU5OTREQTkzMTM5NjY1MEE4MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwN0FDOUVEMjA3MjExRTk5NERBOTMxMzk2NjUwQTgyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwN0FDOUVFMjA3MjExRTk5NERBOTMxMzk2NjUwQTgyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAGAAeAwERAAIRAQMRAf/EAGAAAQACAwAAAAAAAAAAAAAAAAYAAgUHCAEBAAAAAAAAAAAAAAAAAAAAABAAAQQBAwUAAwEAAAAAAAAAAQIDBAURACEGMRIiEwdBoSMUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDqnQF5f0vh0CEzLtZwrUPyJcVpEhJ7y7AfVHkD+fsGEuJ656EaC1H9K4Ne2KK2pt2pc5wKUhhAWCQgdysdyQNgNAm0E0Gt+JP8+r+LtKruNV7suTOnuTI7z6qYpBfPqd9SGJ6VKeGVL8ttt1HJ0COjtfoUmxQ1dcdr66vKVFyVHtXJbgIHiEsmFHByevmMfrQJdBNADqPlDEGhYqTd2Ef0SZckOVTq61Cv9bnsKC02pYwjG2/UnGAcAMtR8FZqLFE5N3czlICgI86e7IYPcMZU2rYkfjQJtB//2Q==" alt="有序列表">
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote" title="引号"
        >
          <img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NUIyNzc4RTIwNzIxMUU5ODg0Q0YxNUFCMkRENzJDOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NUIyNzc4RjIwNzIxMUU5ODg0Q0YxNUFCMkRENzJDOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1QjI3NzhDMjA3MjExRTk4ODRDRjE1QUIyREQ3MkM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ1QjI3NzhEMjA3MjExRTk4ODRDRjE1QUIyREQ3MkM5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAGAAeAwERAAIRAQMRAf/EAGMAAAIDAQAAAAAAAAAAAAAAAAMIAAEFAgEBAAAAAAAAAAAAAAAAAAAAABAAAQMDAwMDBQAAAAAAAAAAAgEDBAARBRITBiExIhQHCGGBMkIjEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwBqaAQzIhSSii82soBQzYQh3EFexKN72oKamRHnnWWX23HmFRHmwISIFXshIi3H70BqCUCmY7235Xh/lfGmeubljkJ03Kq7Hd3HmoJiaqkkO7Sf0FlNXQl/Gg59hvbblnE/kDMiTJrU4YkOS7kpcV3eE23y0s+oX9HHHE16D8vG9rdaBtaCUGJhOEcRwaTkxGIiwVySqWQJlsRJ5SvfcLuSeS9PrQF43xLjPGIRQeP4yPi4pluONRm0BCO1tRKnUlslrrQa1B//2Q==" alt="引号">
        </button>

        <button
            class="menubar__button"
            @click="showImagePrompt(commands.image)" title="图片"
        >
          <img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0REFFMEE3QTIwNzIxMUU5QUZENUM3NDY0OTQ2RDE0OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0REFFMEE3QjIwNzIxMUU5QUZENUM3NDY0OTQ2RDE0OSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjREQUUwQTc4MjA3MjExRTlBRkQ1Qzc0NjQ5NDZEMTQ5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjREQUUwQTc5MjA3MjExRTlBRkQ1Qzc0NjQ5NDZEMTQ5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAGAAeAwERAAIRAQMRAf/EAF8AAAMBAQAAAAAAAAAAAAAAAAAGBwgDAQEAAAAAAAAAAAAAAAAAAAAAEAABBAEDBAIDAAAAAAAAAAACAQMEBQYAERIhIhMHMRRRFQgRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANU6BHne1obVvKrayis7z6hssnNr1gfXJ2RHCUANlIlxycXwuiXaO2g71/scn7ytqLHGbilctnHGYUmeMLwk60w5IIFWNKkGi+Nk1Tt26aBx0BoMp4pOpKrB4d5Mxubk9pVWFDJp4UBH+Tbo0FepvGrKEnEBTdENFRS2T8qgOOAZ/lWYTsLcyqrkVd1CyKcKg/Hcjgcd6nsHGFDmIcuCbtrt17UVeq6C96A0ESZ/na0ZYYYDIIBJGYZig8tbNbdNuM0LLSvLHtGAM0bARUuCb7aBrwP1FExyy/aWT8ezsWF3rZDLUxjwcwNt1eMibOElMD4oqIKom/zvoKFoP//Z" alt="图片">
					</button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
  <div class="antd-fc-editor-readonly" v-else>
    {{content}}
  </div>
</template>

<script>
import Icon from '../src/icons';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
} from 'tiptap-extensions'
import {ConnectItem} from 'tg-turing'
export default {
	name:"antd-fc-editor",
  extends: ConnectItem,
  components: {
    EditorContent,
    EditorMenuBar,
    Icon,
  },
  data() {
	    let content = this.value.replace(/＜/g,'<').replace(/＞/g,'>');
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new Image(),
          new History(),
        ],
          //保存后的html内容的标签尖括号是非半角的，导致在插入编辑器后看到的是html标签而非正确的样式
        content:content,
        onUpdate:this.updateeditor
      }),
        content:content,
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods:{
    updateeditor(value){
      console.log(value.getHTML())
      var tmpHtml = value.getHTML();
      this.$emit("on-item-change", this.name, tmpHtml, tmpHtml, this.model)
      this.$emit("input", tmpHtml)
    },
    showImagePrompt(command) {
			const src = prompt('请输入图片的url')
			if (src !== null) {
				command({ src })
			}
		},
  }
}
</script>
<style>
.ProseMirror.ProseMirror-focused {
	padding: 2px;
}
.page__content {
  padding: 4rem 1rem;
}
.page__footer {
  text-align: center;
  margin-bottom: 2rem;
}
.page__source-link {
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.1);
  color: #000000;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
}
.editor {
  position: relative;

  margin: 0 auto 0 auto;
}
.editor__content {
	border: solid 1px #ddd;
}
.editor__content > div {
	min-height:100px;
}
.editor__content pre {
    padding: 0.7rem 1rem;
    border-radius: 5px;
    background: #000000;
    color: #ffffff;
    font-size: 0.8rem;
    overflow-x: auto;
}
.editor__content pre code {
      display: block;
}
.editor__content p code {
    display: inline-block;
    padding: 0 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
}
.editor__content ul,
  .editor__content ol {
    padding-left: 1rem;
}
.editor__content a {
    color: inherit;
}
.editor__content blockquote {
    border-left: 3px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
    padding-left: 0.8rem;
    font-style: italic;
}
.editor__content blockquote p {
      margin: 0;
}
.editor__content img {
    max-width: 100%;
    border-radius: 3px;
}
.menububble {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 20;
  background: #000000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
          transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.2s, visibility 0.2s;
  transition: opacity 0.2s, visibility 0.2s;
}
.menububble__button {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #ffffff;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
}
.menububble__button:last-child {
      margin-right: 0;
}
.menububble__button:hover {
      background-color: rgba(255, 255, 255, 0.1);
}
.menububble__button.is-active {
      background-color: rgba(255, 255, 255, 0.2);
}
.menububble__form {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.menububble__input {
    font: inherit;
    border: none;
    background: transparent;
    color: #ffffff;
}
.menubar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 1rem;
  -webkit-transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
}
.menubar.is-hidden {
    visibility: hidden;
    opacity: 0;
}
.menubar.is-focused {
    visibility: visible;
    opacity: 1;
    -webkit-transition: visibility 0.2s, opacity 0.2s;
    transition: visibility 0.2s, opacity 0.2s;
}
.menubar__button {
    font-weight: bold;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000000;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
}
.menubar__button:hover {
      background-color: rgba(0, 0, 0, 0.05);
}
.menubar__button.is-active {
      background-color: rgba(0, 0, 0, 0.1);
}
ul[data-type="todo_list"] {
  padding-left: 0;
}
li[data-type="todo_item"] {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
}
.todo-checkbox {
  border: 2px solid #000000;
  height: 0.9em;
  width: 0.9em;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  margin-right: 10px;
  margin-top: 0.3rem;
  -moz-user-select: none;
   -ms-user-select: none;
       user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  border-radius: 0.2em;
  background-color: transparent;
  -webkit-transition: 0.4s background;
  transition: 0.4s background;
}
.todo-content {
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
}
li[data-done="true"] {
  text-decoration: line-through;
}
li[data-done="true"] .todo-checkbox {
  background-color: #000000;
}
li[data-done="false"] {
  text-decoration: none;
}

  .antd-fc-editor-readonly{
    position: relative;
    max-height: 400px;
    overflow: auto;
  }

</style>


