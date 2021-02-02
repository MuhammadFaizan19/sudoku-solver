import time
import sys
import json

parsed = json.loads(sys.argv[1])
p=json.dumps(parsed)
print(u"message"+p)
sys.stdout.flush()
time.sleep(1)
