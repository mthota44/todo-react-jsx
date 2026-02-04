import React, { useState } from 'react';

const programsData = {
    "List Comprehensions": [
        {
            id: "lc1",
            title: "Flatten a Matrix",
            desc: "Use list comprehension to flatten a 2D matrix into a single list.",
            code: `matrix = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
# List Comprehension way:
flat = [item for sublist in matrix for item in sublist]

print(flat) 
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
        },
        {
            id: "lc2",
            title: "Even/Odd Classification",
            desc: "Create a dictionary with even and odd lists using list comprehension.",
            code: `nums = [1, 2, 3, 4, 5, 6, 7, 8]

# We create the keys manually and use a list comprehension as the value
result = {
    "even": [x for x in nums if x % 2 == 0],
    "odd":  [x for x in nums if x % 2 != 0]
}

print(result) 
# Output: {'even': [2, 4, 6, 8], 'odd': [1, 3, 5, 7]}`
        }
    ],
    "Map & Filter": [
        {
            id: "mf1",
            title: "Filter Prime Numbers",
            desc: "Use filter() to extract prime numbers from a range.",
            code: `def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True

nums = range(1, 50)
primes = list(filter(is_prime, nums))
print(primes)
# Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]`
        },
        {
            id: "mf2",
            title: "Convert Celsius to Fahrenheit",
            desc: "Use map() to convert a list of temperatures.",
            code: `celsius = [0, 20, 37, 100]
fahrenheit = list(map(lambda c: (c * 9/5) + 32, celsius))
print(fahrenheit)
# Output: [32.0, 68.0, 98.6, 212.0]`
        },
        {
            id: "mf3",
            title: "Extract Usernames from Emails",
            desc: "Use map() to extract the username part from a list of email addresses.",
            code: `emails = ["alice@example.com", "bob@site.org", "charlie@net.net"]
usernames = list(map(lambda e: e.split('@')[0], emails))
print(usernames)
# Output: ['alice', 'bob', 'charlie']`
        },
        {
            id: "mf4",
            title: "Filter Palindromes",
            desc: "Use filter() to find palindromes in a list of words.",
            code: `words = ["level", "world", "madam", "python", "racecar"]
palindromes = list(filter(lambda w: w == w[::-1], words))
print(palindromes)
# Output: ['level', 'madam', 'racecar']`
        }
    ],
    "Generators": [
        {
            id: "gen1",
            title: "Infinite Fibonacci Generator",
            desc: "Create a generator that yields Fibonacci numbers indefinitely.",
            code: `def fib_gen():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fib_gen()
for _ in range(10):
    print(next(gen), end=" ")
# Output: 0 1 1 2 3 5 8 13 21 34`
        },
        {
            id: "gen2",
            title: "Large File Reader",
            desc: "Read a large file line by line without loading it all into memory.",
            code: `def read_large_file(file_path):
    with open(file_path, 'r') as f:
        for line in f:
            yield line.strip()

# Usage
# for line in read_large_file("huge_log.txt"):
#     process(line)`
        },
        {
            id: "gen3",
            title: "Custom Range Function",
            desc: "Implement a generator that mimics Python's range() function using float steps.",
            code: `def drange(start, stop, step):
    while start < stop:
        yield float(start)
        start += step

print(list(drange(0.5, 1.0, 0.1)))
# Output: [0.5, 0.6, 0.7, 0.8, 0.9]`
        },
        {
            id: "gen4",
            title: "Log Filtering (Generator Expression)",
            desc: "Use a generator expression to filter and process log lines lazily.",
            code: `logs = ["INFO: System start", "ERROR: Disk full", "INFO: User login", "ERROR: Connection lost"]

# Logic: Split by ": ", take the second part [1], only if "ERROR" is in the string
clean_errors = (log.split(": ")[1] for log in logs if "ERROR" in log)

# To see the results:
print(list(clean_errors))
# Output: ['Disk full', 'Connection lost']`
        }
    ],
    "Dictionaries": [
        {
            id: "dict1",
            title: "Word Frequency Counter",
            desc: "Count occurrences of each word in a string.",
            code: `text = "apple banana apple cherry banana apple"
words = text.split()
freq = {}

for w in words:
    freq[w] = freq.get(w, 0) + 1

# Or using collections.Counter
# from collections import Counter
# freq = Counter(words)

print(freq)
# Output: {'apple': 3, 'banana': 2, 'cherry': 1}`
        },
        {
            id: "dict2",
            title: "Invert a Dictionary",
            desc: "Swap keys and values in a dictionary (assuming unique values).",
            code: `my_dict = {'a': 1, 'b': 2, 'c': 3}
inverted = {v: k for k, v in my_dict.items()}
print(inverted)
# Output: {1: 'a', 2: 'b', 3: 'c'}`
        },
        {
            id: "dict3",
            title: "Merge Dictionaries (Recursive)",
            desc: "Deep merge two nested dictionaries.",
            code: `def deep_merge(d1, d2):
    for k, v in d2.items():
        if k in d1 and isinstance(d1[k], dict) and isinstance(v, dict):
            deep_merge(d1[k], v)
        else:
            d1[k] = v
    return d1

a = {'x': 1, 'y': {'a': 2}}
b = {'y': {'b': 3}, 'z': 4}
print(deep_merge(a, b))
# Output: {'x': 1, 'y': {'a': 2, 'b': 3}, 'z': 4}`
        }
    ],
    "Decorators": [
        {
            id: "dec1",
            title: "Execution Timer",
            desc: "Measure the time a function takes to execute.",
            code: `import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.5f}s")
        return result
    return wrapper

@timer
def heavy_computation():
    sum(range(1000000))

heavy_computation()`
        },
        {
            id: "dec2",
            title: "Retry Mechanism",
            desc: "Retry a function if it raises an exception.",
            code: `import random

def retry(attempts=3):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for i in range(attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Attempt {i+1} failed: {e}")
            raise Exception("All attempts failed")
        return wrapper
    return decorator

@retry(attempts=3)
def unstable_network():
    if random.random() < 0.7:
        raise ConnectionError("Disconnected")
    return "Connected!"

# print(unstable_network())`
        }
    ],
    "Strings": [
        {
            id: "str1",
            title: "Check Anagrams",
            desc: "Check if two strings are anagrams of each other.",
            code: `def is_anagram(s1, s2):
    return sorted(s1) == sorted(s2)

# O(N) approach using Counter is better for large strings
from collections import Counter
def is_anagram_fast(s1, s2):
    return Counter(s1) == Counter(s2)

print(is_anagram("listen", "silent")) # True`
        },
        {
            id: "str2",
            title: "Longest Substring Without Repeating Characters",
            desc: "Find the length of the longest unique substring.",
            code: `def length_of_longest_substring(s):
    char_map = {}
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        if s[right] in char_map:
            left = max(left, char_map[s[right]] + 1)
        char_map[s[right]] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len

print(length_of_longest_substring("abcabcbb")) # 3 (abc)`
        },
        {
            id: "str3",
            title: "Password Strength (Basic)",
            desc: "Check password strength using any() for digits and uppercase.",
            code: `def is_strong(password):
    # Condition 1: Length check
    if len(password) < 8:
        return False
    
    # Condition 2: Use any() to find at least one digit
    has_digit = any(char.isdigit() for char in password)
    
    # Condition 3: Use any() to find at least one uppercase letter
    has_upper = any(char.isupper() for char in password)
    
    return has_digit and has_upper

# Test it out
print(is_strong("P@ssword123")) # True
print(is_strong("password"))    # False (No upper, no digit)`
        },
        {
            id: "str4",
            title: "Password Strength (Pro)",
            desc: "Concise password strength check using all() and list/generator verification.",
            code: `def is_strong_pro(password):
    return all([
        len(password) >= 8,
        any(c.isdigit() for c in password),
        any(c.isupper() for c in password)
    ])

# Test it out
print(is_strong_pro("P@ssword123")) # True
print(is_strong_pro("password"))    # False (No upper, no digit)`
        }
    ],
    "Math": [
        {
            id: "math1",
            title: "Factorial (Iterative vs Recursive)",
            desc: "Compute the factorial of a number using both methods.",
            code: `def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

def factorial_recursive(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial_recursive(n - 1)

print(factorial_iterative(5)) # 120`
        },
        {
            id: "math2",
            title: "GCD (Euclidean Algorithm)",
            desc: "Efficiently find the Greatest Common Divisor of two numbers.",
            code: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

print(gcd(48, 18)) # 6`
        },
        {
            id: "math3",
            title: "Check Armstrong Number",
            desc: "A number is Armstrong if the sum of its digits raised to the power of the number of digits equals the number itself.",
            code: `def is_armstrong(n):
    digits = [int(d) for d in str(n)]
    power = len(digits)
    return sum(d ** power for d in digits) == n

print(is_armstrong(153)) # True (1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153)`
        },
        {
            id: "math4",
            title: "Nth Fibonacci Number (Recursive with Memoization)",
            desc: "Find the Nth Fibonacci number efficiently using a cache.",
            code: `memo = {}

def fib(n):
    if n in memo: return memo[n]
    if n <= 1: return n
    
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]

print(fib(50)) # 12586269025`
        }
    ]
};

const PythonPrograms = () => {
    const [activeTab, setActiveTab] = useState("List Comprehensions");

    return (
        <div style={styles.container}>
            <div style={styles.tabs}>
                {Object.keys(programsData).map(category => (
                    <button
                        key={category}
                        style={{
                            ...styles.tabButton,
                            backgroundColor: activeTab === category ? '#ff8c00' : 'rgba(255,255,255,0.1)',
                            color: activeTab === category ? '#fff' : '#aaa'
                        }}
                        onClick={() => setActiveTab(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div style={styles.contentArea}>
                {programsData[activeTab].map((item, idx) => (
                    <div key={item.id} style={styles.card}>
                        <div style={styles.programHeader}>
                            <span style={styles.progNum}>#{idx + 1}</span>
                            <h3 style={styles.progTitle}>{item.title}</h3>
                        </div>
                        <p style={styles.desc}>{item.desc}</p>
                        <div style={styles.codeContainer}>
                            <pre style={styles.codeBlock}>
                                <code>{item.code}</code>
                            </pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        padding: '20px 0',
    },
    tabs: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '30px',
    },
    tabButton: {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
    },
    contentArea: {
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    },
    programHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '10px',
    },
    progNum: {
        background: '#333',
        color: '#ff8c00',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
    },
    progTitle: {
        margin: 0,
        color: '#fff',
        fontSize: '1.2rem',
    },
    desc: {
        color: '#bbb',
        marginBottom: '15px',
        lineHeight: '1.5',
    },
    codeContainer: {
        background: '#1e1e1e',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #333',
    },
    codeBlock: {
        margin: 0,
        padding: '15px',
        overflowX: 'auto',
        color: '#a9b7c6',
        fontFamily: "'Fira Code', 'Consolas', monospace",
        fontSize: '0.9rem',
        lineHeight: '1.5',
    }
};

export default PythonPrograms;
