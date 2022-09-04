def multiplication(A,B):
    #m - кол-во строк матрицы а
    m = len(A)

    #кол-во стоблцов матрицы а
    n = len(A[0])

    # - кол-во строк матрицы b
    N = len(B)

    #кол-во стоблцов матрицы b
    k = len(B[0])

    if (n == N):
        #пустая матрица m*k
        c = [[0 for q in range(k)] for q in range(m)]


        for i in range(m): 
            for j in range(k):
                c[i][j] = sum(A[i][s] * B[s][j] for s in range(n))

        res = ""
        for i in range(m):
            res +=  str(c[i]) + "\n"
        return print(res)
    else:
        return print("Операция умножения двух матриц невыполнима")
#106  
a = [[-2,1],
     [3,4]]

b = [[-1,3],
     [-2,1]]

#107
c = [[2,1],
     [3,2]]

d = [[1,-1],
     [1,1]]

#108
e = [[3,5],
     [6,-1]]

f = [[2,1],
     [-3,2]]

#109
g = [[-2,3],
     [-5,-6]]

h = [[5,2],
     [4,-7]]

#110
i = [[-1,7,2],
     [4,2,-3],
     [11,-6,3]]

j = [[2,0,0],
     [0,2,0],
     [0,0,2]]

#111
k= [[-2,1,-1],
     [3,2,2],
     [-4,5,1]]

l = [[3],
     [-1],
     [-2]]

#112
m = [[1,0,-3],
     [0,2,-1],
     [4,-3,2]]

n = [[5,-2,0],
     [0,4,-3],
     [-3,2,0]]

#113
o = [[2,3,4],
     [1,2,3],
     [-1,0,2]]

p = [[4,-3,2],
     [-3,2,3],
     [1,-3,2]]

#114
q = [[1,-4,-2]]

r = [[2],
     [0],
     [-3]]

#115
s = [[-2],
     [3],
     [1]]

t = [[4,-1,3]]

#116
u = [[2,-3,0,4],
     [-4,0,2,-1]]

v = [[-1,0],
     [0,-1],
     [3,4],
     [-2,-1]]

multiplication(a,b)
multiplication(c,d)
multiplication(e,f)
multiplication(g,h)
multiplication(i,j)
multiplication(k,l)
multiplication(m,n)
multiplication(o,p)
multiplication(q,r)
multiplication(s,t)
multiplication(u,v)