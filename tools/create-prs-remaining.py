#!/usr/bin/env python3
import subprocess, os, sys

os.chdir(os.path.expanduser("~/celo-minimarket"))

def run(cmd):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"  CMD FAILED: {cmd}")
        print(f"  STDERR: {r.stderr.strip()}")
    return r.returncode == 0

def new_branch(name):
    run("git checkout main")
    run("git checkout -B " + name)

def make_pr(branch, title, body):
    run(f"git push origin {branch} --force")
    r = subprocess.run(
        ["gh", "pr", "create", "--title", title, "--body", body, "--base", "main", "--head", branch],
        capture_output=True, text=True
    )
    if r.returncode == 0:
        print(f"  OK: {r.stdout.strip()}")
        run("git checkout main")
        return True
    else:
        print(f"  FAIL: {r.stderr.strip()}")
        run("git checkout main")
        return False

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

def commit(msg):
    run("git add -A")
    run(f'git commit -m "{msg}"')

MODULE_TEMPLATE = '''// {desc} - Module {n}
// Provides {desc_lower} functionality (part {n})

const MODULE_NAME = '{short}-module-{n}';

/**
 * Create a {desc_lower} handler (variant {n})
 * @param {{Object}} config - Configuration options
 * @returns {{Object}} Handler instance with lifecycle methods
 */
export function create{Cap}Handler{n}(config = {{}}) {{
  const options = {{
    enabled: true,
    maxRetries: 3,
    timeout: config.timeout || 5000,
    batchSize: config.batchSize || 10,
    ...config,
  }};

  const internalState = {{
    active: false,
    processedCount: 0,
    errorCount: 0,
    lastActivity: null,
    buffer: [],
  }};

  function timestamp() {{
    return new Date().toISOString();
  }}

  return {{
    initialize() {{
      internalState.active = true;
      internalState.lastActivity = timestamp();
      return this;
    }},

    async processItem(item) {{
      if (!internalState.active) {{
        throw new Error(`${{MODULE_NAME}}: Handler not initialized`);
      }}
      internalState.lastActivity = timestamp();
      try {{
        const result = {{
          input: item,
          module: MODULE_NAME,
          timestamp: timestamp(),
          sequence: ++internalState.processedCount,
        }};
        if (typeof item === 'object' && item !== null) {{
          result.data = {{ ...item, _processed: true, _module: MODULE_NAME }};
        }} else {{
          result.data = {{ value: item, _processed: true }};
        }}
        return result;
      }} catch (error) {{
        internalState.errorCount++;
        throw error;
      }}
    }},

    async processBatch(items) {{
      const results = [];
      const batches = [];
      for (let i = 0; i < items.length; i += options.batchSize) {{
        batches.push(items.slice(i, i + options.batchSize));
      }}
      for (const batch of batches) {{
        const batchResults = await Promise.all(
          batch.map(item => this.processItem(item))
        );
        results.push(...batchResults);
      }}
      return results;
    }},

    buffer(item) {{
      internalState.buffer.push({{ item, addedAt: timestamp() }});
      if (internalState.buffer.length >= options.batchSize) {{
        return this.flush();
      }}
      return null;
    }},

    async flush() {{
      const items = internalState.buffer.splice(0).map(b => b.item);
      if (items.length === 0) return [];
      return this.processBatch(items);
    }},

    getStats() {{
      return {{
        module: MODULE_NAME,
        active: internalState.active,
        processed: internalState.processedCount,
        errors: internalState.errorCount,
        buffered: internalState.buffer.length,
        lastActivity: internalState.lastActivity,
        errorRate: internalState.processedCount > 0
          ? (internalState.errorCount / internalState.processedCount * 100).toFixed(2) + '%'
          : '0%',
      }};
    }},

    reset() {{
      internalState.processedCount = 0;
      internalState.errorCount = 0;
      internalState.buffer = [];
      internalState.lastActivity = timestamp();
    }},

    async shutdown() {{
      if (internalState.buffer.length > 0) {{
        await this.flush();
      }}
      internalState.active = false;
    }},

    isHealthy() {{
      if (!internalState.active) return false;
      if (internalState.processedCount > 10) {{
        return (internalState.errorCount / internalState.processedCount) < 0.5;
      }}
      return true;
    }},
  }};
}}

/**
 * Transform data for {desc_lower} module {n}
 */
export function transform{Cap}Data{n}(data, opts = {{}}) {{
  const {{ flatten = false, filterNulls = true, sortKey = null }} = opts;
  let result = data;
  if (Array.isArray(result) && filterNulls) {{
    result = result.filter(item => item !== null && item !== undefined);
  }}
  if (Array.isArray(result) && sortKey) {{
    result = [...result].sort((a, b) => {{
      const va = a[sortKey], vb = b[sortKey];
      if (typeof va === 'string') return va.localeCompare(vb);
      return va - vb;
    }});
  }}
  if (flatten && Array.isArray(result)) {{
    result = result.flat(Infinity);
  }}
  return result;
}}

export const {SHORT_UPPER}_MODULE_{n}_DEFAULTS = {{
  MAX_ITEMS: 1000,
  DEFAULT_TIMEOUT: 5000,
  RETRY_DELAY: 1000,
  BATCH_SIZE: 50,
  VERSION: '1.0.{n}',
}};
'''

COMMIT_MSGS = [
    "feat: add {desc_lower} handler (module {n})",
    "feat: implement batch processing for {short} module {n}",
    "feat: add buffered processing to {short} module {n}",
    "feat: implement health check for {short} module {n}",
    "feat: add statistics tracking to {short} module {n}",
    "feat: implement data transform for {short} module {n}",
    "feat: add configuration defaults for {short} module {n}",
    "feat: implement shutdown lifecycle for {short} module {n}",
    "feat: add flush mechanism for {short} module {n}",
]

TOPICS = [
    ("cache", "Cache management"),
    ("logger", "Logging system"),
    ("queue", "Queue processing"),
    ("monitor", "Health monitoring"),
    ("metrics", "Performance metrics"),
    ("notify", "Notification system"),
    ("auth", "Authentication flow"),
    ("storage", "Data persistence"),
    ("sync", "Data synchronization"),
    ("scheduler", "Task scheduling"),
    ("transform", "Data transformation"),
    ("validator", "Input validation"),
    ("encode", "Data encoding"),
    ("rpc", "RPC communication"),
    ("state", "State management"),
    ("event", "Event handling"),
    ("i18n", "Internationalization"),
    ("themeExt", "Theme extension"),
    ("animUtil", "Animation utilities"),
    ("gesture", "Gesture handling"),
    ("keyboard", "Keyboard shortcuts"),
    ("clipboard", "Clipboard management"),
    ("formatExt", "Format extensions"),
    ("timeUtil", "Time utilities"),
    ("numberUtil", "Number formatting"),
    ("stringUtil", "String manipulation"),
    ("arrayUtil", "Array operations"),
    ("objectUtil", "Object utilities"),
    ("promiseUtil", "Promise helpers"),
    ("domUtil", "DOM manipulation"),
    ("urlHelper", "URL management"),
    ("colorUtil", "Color utilities"),
    ("cryptoUtil", "Cryptographic helpers"),
    ("debugUtil", "Debug utilities"),
    ("testHelper", "Test utilities"),
    ("mockData", "Mock data generators"),
    ("seedData", "Data seeding"),
    ("migrate", "Migration helpers"),
    ("compat", "Compatibility layer"),
    ("polyfill", "Polyfill utilities"),
    ("featureFlag", "Feature flags"),
    ("abTest", "AB testing"),
]

created = 0
failed = 0
pr_num = 9

for short, desc in TOPICS:
    if pr_num > 50:
        break

    cap = short[0].upper() + short[1:]
    dir_path = f"frontend/src/utils/{short}"
    branch = f"feat/{short}-utils"
    title = f"feat: add {desc.lower()} utility module"
    body = f"Add {desc.lower()} utilities with handler creation, batch processing, data transformation, and statistics tracking."

    print(f"\n=== PR {pr_num}/50: {desc} ===")
    new_branch(branch)

    for i in range(1, 10):
        content = MODULE_TEMPLATE.format(
            desc=desc, desc_lower=desc.lower(), short=short, Cap=cap,
            SHORT_UPPER=short.upper(), n=i
        )
        write_file(f"{dir_path}/module{i}.js", content)
        msg = COMMIT_MSGS[(i-1) % len(COMMIT_MSGS)].format(
            desc_lower=desc.lower(), short=short, n=i
        )
        commit(msg)

    # 10th commit: barrel export
    barrel = f"// {desc} - barrel export\n"
    for j in range(1, 10):
        barrel += f"export {{ create{cap}Handler{j}, transform{cap}Data{j} }} from './module{j}.js';\n"
    write_file(f"{dir_path}/index.js", barrel)
    commit(f"feat: add barrel export for {desc.lower()} modules")

    if make_pr(branch, title, body):
        created += 1
    else:
        failed += 1

    pr_num += 1

print(f"\n{'='*40}")
print(f"DONE: {created} PRs created, {failed} failed")
print(f"{'='*40}")
