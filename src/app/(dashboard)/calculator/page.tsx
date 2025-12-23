'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface GradeItem {
  id: string;
  name: string;
  score: string;
  maxScore: string;
  weight: string;
}

export default function GradeCalculatorPage() {
  const [grades, setGrades] = useState<GradeItem[]>([
    { id: uuidv4(), name: 'Assignment 1', score: '85', maxScore: '100', weight: '20' },
    { id: uuidv4(), name: 'Mid-term Exam', score: '92', maxScore: '100', weight: '30' },
    { id: uuidv4(), name: '', score: '', maxScore: '100', weight: '' },
  ]);

  const handleGradeChange = (id: string, field: keyof GradeItem, value: string) => {
    setGrades(grades.map(g => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const addGradeRow = () => {
    setGrades([...grades, { id: uuidv4(), name: '', score: '', maxScore: '100', weight: '' }]);
  };

  const removeGradeRow = (id: string) => {
    setGrades(grades.filter(g => g.id !== id));
  };

  const { totalWeightedScore, totalWeight } = useMemo(() => {
    return grades.reduce(
      (acc, { score, maxScore, weight }) => {
        const numScore = parseFloat(score);
        const numMaxScore = parseFloat(maxScore);
        const numWeight = parseFloat(weight);

        if (!isNaN(numScore) && !isNaN(numMaxScore) && !isNaN(numWeight) && numMaxScore > 0) {
          acc.totalWeightedScore += (numScore / numMaxScore) * numWeight;
          acc.totalWeight += numWeight;
        }
        return acc;
      },
      { totalWeightedScore: 0, totalWeight: 0 }
    );
  }, [grades]);

  const finalGrade = totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Grade Calculator</CardTitle>
        <CardDescription>
          Track your academic progress by calculating your current grade.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[40%]'>Assignment Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Max Score</TableHead>
              <TableHead>Weight (%)</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map(grade => (
              <TableRow key={grade.id}>
                <TableCell>
                  <Input
                    value={grade.name}
                    onChange={e => handleGradeChange(grade.id, 'name', e.target.value)}
                    placeholder="e.g., Final Project"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={grade.score}
                    onChange={e => handleGradeChange(grade.id, 'score', e.target.value)}
                    placeholder="88"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={grade.maxScore}
                    onChange={e => handleGradeChange(grade.id, 'maxScore', e.target.value)}
                    placeholder="100"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={grade.weight}
                    onChange={e => handleGradeChange(grade.id, 'weight', e.target.value)}
                    placeholder="50"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => removeGradeRow(grade.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={addGradeRow} variant="outline" className="mt-4">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Row
        </Button>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 border-t p-6">
        <p className="text-muted-foreground">Total Weight: <span className="font-medium text-foreground">{totalWeight.toFixed(2)}%</span></p>
        <p className="text-xl font-bold font-headline">Current Grade: <span className="text-primary">{finalGrade.toFixed(2)}%</span></p>
      </CardFooter>
    </Card>
  );
}
